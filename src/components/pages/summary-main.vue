<template>
  <v-container grid-list-md>
    <page-title text="VOA Order Summary" />
    <BaseReportLink
      :actionLinks="GENERATELINKS"
      @onCommandEvent="onCommandEvent"
    />
    <section>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <BaseCard :links="SUMMARYDATA" />
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-5">
        <v-flex xs12>
          <BaseTable
            :items="tabledata"
            :fields="headers"
            hide-default-footer
            label="Borrower Details"
            labelclass="text-button"
            @sendMail="sendMails"
          >
          </BaseTable>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-5">
        <v-flex xs12 md12>
          <BaseTable
            :items="orderStatusItems"
            :fields="orderStatusFields"
            hide-default-footer
            label="Order History"
            labelclass="text-button"
          >
          </BaseTable>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md12 class="my-5">
          <BaseLabel label="STATUS HISTORY:"></BaseLabel>
          <ul class="events p-0">
            <li v-for="itemStatus in infoModel" :key="itemStatus.statusDate">
              <time>{{ itemStatus.statusDate }}</time>
              <div class="circle"></div>
              <span class="{ active: '', 'text-danger'}">
                {{ itemStatus.statusInfo }}
              </span>
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
import BaseCard from '../sections/BaseCard.vue'
import BaseTable from '../sections/BaseTable.vue'
import common from '../../utils/common'
import constant from '../../constants/constant'
import { mapActions } from 'vuex'
import * as apiTypes from '@/services/api/api-types'
import { mapGetters } from 'vuex'

const EventCodes = {
  generate: 1,
  view_transferReport: 2,
  view_Refresh: 4
}
export default {
  components: {
    BaseCard,
    BaseTable
  },
  data() {
    return {
      tabledata: [],
      status: '',
      orderFileId: '',
      displayPdfView: false,
      displayGenerate: false,
      displayRefreshIcon: false,
      displayResendEmail: false,
      isRefreshPeriod: 'No',
      isPdfGenerated: 'No',
      referenceNumber: '',
      statusMessage: '',
      headers: [
        { text: 'NAME', value: 'name', sortable: false },
        { text: 'EMAIL', value: 'email' },
        { text: 'URL', value: 'url' }
      ],
      orderStatusItems: [],
      orderStatusFields: [
        { text: 'DATE ORDERED', value: 'date' },
        { text: 'VERIFICATION TYPE', value: 'verification' },
        { text: 'ACCOUNT HISTORY', value: 'account' },
        { text: 'REFRESH PERIOD', value: 'refresh' }
      ],
      infoModel: []
    }
  },
  computed: {
    ...mapGetters(['config']),
    ORDERID() {
      return this.config.orderId || this.$route.params.orderId || 0
    },
    TOKEN() {
      return this.$route.query.Token || ''
    },
    SUMMARYDATA() {
      const data = []
      data.push(
        [
          { text: 'Order ID', value: this.ORDERID },
          { text: 'Status', value: this.statusMessage }
        ],
        [
          {
            text: 'Reference Number',
            value: this.referenceNumber
          }
        ]
      )
      return data
    },
    GENERATELINKS() {
      return [
        {
          text: 'Generate Report',
          event: EventCodes.generate,
          isShow: this.displayGenerate
        },
        {
          text: 'PDF View',
          event: EventCodes.view_transferReport,
          icon: '',
          isShow: this.displayPdfView || this.displayRefreshIcon
        },
        {
          text: 'Refresh',
          event: EventCodes.view_Refresh,
          icon: '',
          isShow: this.displayRefreshIcon
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'addTask',
      'removeTask',
      'setNotification',
      'doGET',
      'doPOST'
    ]),
    onCommandEvent(command) {
      switch (command) {
        case EventCodes.generate:
          this.generateReport()
          break
        case EventCodes.view_transferReport:
          this.downloadOrderFile()
          break
        case EventCodes.view_Refresh:
          this.refreshVoaResult()
          break
      }
    },
    refreshVoaResult() {
      this.doGET({
        getType: apiTypes.CPSS_GET_VOA_REPORT,
        params: {
          token: this.TOKEN,
          orderId: this.ORDERID
        }
      }).then((data) => {
        this.orderFileId = data.orderFieldId
      })
    },

    downloadOrderFile() {
      // eslint-disable-next-line no-alert
      this.doGET({
        getType: apiTypes.CPSS_GET_DOCUMENT_DOWNLOAD,
        params: {
          token: this.TOKEN,
          orderId: this.orderFileId
        }
      }).then((data) => {
        const url = common.downloadFile(
          data.fileData,
          data.contentType,
          data.fileName
        )
        const routeData = this.$router.resolve({
          name: apiTypes.PDF_VIEWER,
          query: { url }
        })
        window.open(routeData.href, '_blank')
      })
    },

    generateReport() {
      this.doGET({
        getType: apiTypes.CPSS_GET_VOA_REPORT,
        params: {
          token: this.TOKEN,
          orderId: this.ORDERID
        },
        errorMessage: 'An error occured while Generating Report'
      }).then((data) => {
        this.status = data.status
        this.isRefreshPeriod = data.isRefreshPeriod
        this.isPdfGenerated = data.isPdfGenerated
        this.orderFileId = data.orderFieldId
        this.getStatus()
        const respData = data
        const url = common.downloadFile(
          respData.reportByteArray,
          constant.contentType.pdf,
          `VoA_${respData.orderId}`
        )
        const routeData = this.$router.resolve({
          name: apiTypes.PDF_VIEWER,
          query: { url }
        })
        window.open(routeData.href, '_blank')
      })
    },
    // eslint-disable-next-line complexity
    getStatus() {
      if (this.status !== '507' && this.status !== '513') {
        this.NotAcceptedTerms()
      } else if (this.status === '513') {
        this.RefreshPeriodEnded()
      } else if (this.status === '507' && this.isPdfGenerated === 'No') {
        this.ReportCreated()
      } else if (
        this.status === '507' &&
        this.isPdfGenerated === 'Yes' &&
        this.isRefreshPeriod === 'No'
      ) {
        this.ReportCreatedWithoutRefresh()
      } else if (
        this.status === '507' &&
        this.isPdfGenerated === 'Yes' &&
        this.isRefreshPeriod === 'Yes'
      ) {
        this.ReportCreatedWithRefresh()
      }
    },
    NotAcceptedTerms() {
      this.displayResendEmail = true
      this.statusMessage = 'In Progress'
    },
    RefreshPeriodEnded() {
      this.displayPdfView = true
      this.displayGenerate = false
      this.displayRefreshIcon = false
      this.displayResendEmail = false
      this.statusMessage = 'Completed'
    },

    ReportCreated() {
      this.displayGenerate = true
      this.displayResendEmail = true
      this.displayPdfView = false
      this.displayRefreshIcon = false
      this.statusMessage = 'In Progress'
    },
    ReportCreatedWithoutRefresh() {
      this.displayPdfView = true
      this.displayGenerate = false
      this.displayRefreshIcon = false
      this.displayResendEmail = false
      this.statusMessage = 'Completed'
    },
    ReportCreatedWithRefresh() {
      this.displayPdfView = true
      this.displayRefreshIcon = true
      this.displayResendEmail = true
      this.displayGenerate = false
      this.statusMessage = 'In Progress'
    },
    sendMails() {
      const payload = { orderId: this.ORDERID }
      this.doPOST({
        product: apiTypes.CPSS_POST_SEND_MAIL,
        payload,
        token: this.TOKEN,
        errorMessage: 'An error occured while Sending Email',
        successMsg: 'Email Sent Successfully',
        errorParams: {
          router: this.$router,
          redirect500: true
        }
      })
    }
  },
  mounted() {
    this.doGET({
      getType: apiTypes.CPSS_GET_VOA_SUMMARY,
      params: {
        token: this.TOKEN,
        orderId: this.ORDERID
      },
      errorMessage: 'An error occured while loading the VOA summary data',
      errorParams: {
        router: this.$router,
        redirect500: true
      }
    }).then((data) => {
      this.status = data.status
      this.referenceNumber = data.referenceNumber
      this.isPdfGenerated = data.isPdfGenerated
      this.isRefreshPeriod = data.isRefreshPeriod
      this.orderFileId = data.orderFieldId
      this.getStatus()
      this.tabledata = [
        {
          name: data.borrowerName,
          email: data.borrowerEmail,
          url: data.url,
          isDisplayMail: this.displayResendEmail
        }
      ]
      this.orderStatusItems = [
        {
          date: data.responseTime,
          verification: data.verificationType,
          account: data.accountHistory,
          refresh: data.refreshPeriod
        }
      ]
      this.infoModel = data.orderStatus
    })
  }
}
</script>

<style>
.circle {
  z-index: 2;
  width: 0.98em;
  height: 0.8em;
  content: '';
  background-color: #3949ab;
  border: 1px rgb(204, 204, 204) solid;
  border-radius: 50%;
  transform: translateX(50%);
}
.events li {
  display: flex;
}
.events time {
  position: relative;
  width: 21%;
  padding: 0 2.5em 1.5em 0;
  font-size: 12px;
  color: #2f2f2f;
  text-align: right;
}
.events span {
  position: relative;
  width: 100%;
  padding: 0 2.5em 1.5em 1.5em;
  font-size: 12px;
}

.events span::before {
  position: absolute;
  left: -1px;
  z-index: 1;
  height: 100%;
  content: '';
  border-left: 2px solid #ccc;
}
.events li:last-child span::before {
  border-left: none;
}
.events {
  width: 100%;
  margin: 1em;
}
.events:last-child {
  border-left: none;
}

.events *::before,
.events *::after {
  box-sizing: border-box;
}
</style>
