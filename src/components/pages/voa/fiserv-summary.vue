<template>
  <v-container grid-list-md>
    <PdfModal :pdf-data="PDFURL" />
    <page-title text="Verification of Assets - Fiserv" />
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
            @deleteBorrower="deleteBorrower"
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
            label="Order Details"
            labelclass="text-button"
          >
          </BaseTable>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md12 class="my-5">
          <BaseLabel label="Status History" vclass="text-button" />
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
import BaseCard from '../../sections/BaseCard.vue'
import BaseTable from '../../sections/BaseTable.vue'
import common from '../../../utils/common'
import { mapActions } from 'vuex'
import * as apiTypes from '@/services/api/api-types'
import { mapGetters } from 'vuex'
import PdfModal from '../../sections/pdfModal.vue'

const EventCodes = {
  generate: 1,
  view_transferReport: 2,
  view_Refresh: 4
}
export default {
  components: {
    BaseCard,
    BaseTable,
    PdfModal
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
      pdfData: {},
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
    PDFURL() {
      return this.pdfData
    },
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
          {
            text: 'Reference Number',
            value: this.referenceNumber
          }
        ],
        [{ text: 'Status', value: this.status }]
      )
      return data
    },
    GENERATELINKS() {
      return [
        {
          text: 'Generate Report',
          event: EventCodes.generate,
          isShow: this.displayGenerate
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
      'doPOST',
      'setPDFView',
      'setModalView'
    ]),
    deleteBorrower() {
      this.setModalView()
    },
    onCommandEvent(command) {
      switch (command) {
        case EventCodes.generate:
          this.generateReport()
          break
      }
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
        this.pdfData = data
        this.setPDFView(true)
      })
    },
    sendMails() {
      const payload = { orderId: this.ORDERID }
      this.doPOST({
        product: apiTypes.CPSS_FISERV_POST_SEND_MAIL,
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
      getType: apiTypes.CPSS_GET_VOA_FISERV_SUMMARY,
      params: {
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRXh0ZXJuYWxJRCI6ImViYWY3YTliLTM0OWUtNDRkZS1iMDEyLTQ5MzI4ZTQ0YjE0NCIsIlVzZXJJRCI6IjE2IiwiQ3VzdG9tZXJJZCI6IjEiLCJGaXJzdE5hbWUiOiJKb2hubnkiLCJNaWRkbGVJbml0aWFsIjoiIiwiTGFzdE5hbWUiOiJUZXN0IiwiZW1haWwiOiJUQ19SaXNoaSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InhhY3R1cyBBZG1pbiIsIkxvZ2luU2Vzc2lvbklEIjoiMTE3MDU1IiwiQ3VzdG9tZXJOYW1lIjoieGFjdHVzIiwiUm9sZXMiOiJ4YWN0dXMgQWRtaW4sRnJhdWRQbHVzIEFkbWluIiwiZXhwIjoxNjU0MDg5MjgzLCJpc3MiOiJodHRwczovL2F6YXBwLWNwc3MtcWEtYXBpLTAwMS5henVyZXdlYnNpdGVzLm5ldC9hdXRoIiwiYXVkIjoiaHR0cHM6Ly9hemFwcC1jcHNzLXFhLWFwaS0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.zjS5KMvlwnaV1dixGG6ZQ4VD8TMegmfMiBmBc-vbg2E',
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
      this.tabledata = [
        {
          name: data.borrowerName,
          email: data.borrowerEmail,
          url: data.url,
          isDisplayMail: this.status === 'InProgress',
          isDisplayDelete: data.isDeleteVisible
        }
      ]
      this.orderStatusItems = [
        {
          date: data.responseTime,
          verification: data.verificationType,
          account: data.accountHistory,
          refresh: this.getRefreshPeriodLabels(data.refreshPeriod)
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
