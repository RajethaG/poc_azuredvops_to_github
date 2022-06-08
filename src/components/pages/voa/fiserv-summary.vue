<template>
  <v-container grid-list-md>
    <PdfModal :pdf-data="PDFURL" />
    <page-title text="Verification of Assets - Fiserv" />
    <BaseReportLink
      :actionLinks="GENERATELINKS"
      @onCommandEvent="onCommandEvent"
    />
    <modal
      title="Confirmation"
      cancel-variant="cancel"
      ok-variant="Submit"
      @confirmOkClicked="confirmOk"
      @confirmCancelClicked="confirmCancel"
    >
      <p>
        Borrower account will be deleted permanently and weblink will no longer
        be accessible to the borrower
      </p>
    </modal>
    <section>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <BaseCard :links="SUMMARYDATA" />
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-5">
        <v-flex xs12>
          <BaseTable
            :items="TABLE"
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
import Modal from '../../sections/Modal.vue'

const EventCodes = {
  generate: 1,
  view_transferReport: 2,
  view_Refresh: 4
}
export default {
  components: {
    BaseCard,
    BaseTable,
    PdfModal,
    Modal
  },
  data() {
    return {
      reponseData: [],
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
        { text: 'URL', value: 'url' },
        { text: 'Actions', value: 'actions' }
      ],
      orderStatusItems: [],
      orderStatusFields: [
        { text: 'DATE ORDERED', value: 'date' },
        { text: 'VERIFICATION TYPE', value: 'verification' },
        { text: 'ACCOUNT HISTORY', value: 'account' },
        { text: 'REFRESH PERIOD', value: 'refresh' }
      ],
      infoModel: [],
      disableDeleteBtn: false
    }
  },
  computed: {
    ...mapGetters(['config']),
    TABLE() {
      return [
        {
          name: this.reponseData.borrowerName,
          email: this.reponseData.borrowerEmail,
          url: this.reponseData.url,
          isDisplayMail: this.disableDeleteBtn,
          isDisplayDelete: this.disableDeleteBtn,
          isShowDelete: true
        }
      ]
    },
    PDFURL() {
      return this.pdfData
    },
    ORDERID() {
      return this.config.orderId || this.$route.params.orderId || 0
    },
    TOKEN() {
      return this.$route.query.Token || ''
    },
    USERID() {
      return this.config.customerInfo.userId || 0
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
          isShow: true
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
    confirmOk() {
      this.confirmCancel()
      const payload = { orderId: this.ORDERID, userId: this.USERID }
      this.doPOST({
        product: apiTypes.CPSS_FISERV_DELETE_USER,
        payload,
        token: this.TOKEN,
        errorMessage: 'Delete action failed',
        successMsg: 'Borrower account deleted successfully',
        errorParams: {
          router: this.$router,
          redirect500: true
        }
      }).then((response) => {
        this.disableDeleteBtn = response.message === 'Successful'
      })
    },
    confirmCancel() {
      this.setModalView(false)
    },
    deleteBorrower() {
      this.setModalView(true)
    },
    onCommandEvent(command) {
      switch (command) {
        case EventCodes.generate:
          this.generateReport()
          break
      }
    },
    generateReport() {
      const payload = { orderId: this.ORDERID, userId: this.USERID }
      this.doPOST({
        product: apiTypes.CPSS_FISERV_GENERATE_REPORT,
        payload,
        token: this.TOKEN,
        errorParams: {
          router: this.$router,
          redirect500: true
        }
      }).then((response) => {
        if (response.fileData !== null) {
          this.pdfData = response.fileData
          this.setPDFView(true)
          return
        }
        this.setNotification({
          msg: response.severity + ': ' + response.statusDesc,
          type: 'error'
        })
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
        token: this.TOKEN,
        orderId: this.ORDERID
      },
      errorMessage:
        'An error occured while loading the VOA Fiserv summary data',
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
      this.disableDeleteBtn = !data.isDeleteVisible

      this.reponseData = data
      this.orderStatusItems = [
        {
          date: data.requestTime,
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
