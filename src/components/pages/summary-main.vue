<template>
  <v-container>
    <page-title text="VOA Order Summary" />
    <BaseReportLink
      :actionLinks="clickableLink"
      @onCommandEvent="onCommandEvent"
    />
    <section>
      <v-layout row wrap class="my-3">
        <v-flex xs12 md12>
          <BaseCard :links="summarydata" />
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-5 pl-3">
        <v-flex xs12 md12>
          <BaseTable
            :items="tabledata"
            :fields="headers"
            hide-default-footer
            label="Borrower Details"
            @sendMail="sendMails"
          >
          </BaseTable>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-5 pl-3">
        <v-flex xs12 md12>
          <BaseTable
            :items="orderStatusItems"
            :fields="orderStatusFields"
            hide-default-footer
            label="Order History"
          >
          </BaseTable>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md12 class="my-5">
          <BaseLabel label="Status History:"></BaseLabel>
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
import axios from 'axios'
import common from '../../store/modules/common'
import constant from '../../constants/constant'
import { mapActions } from 'vuex'
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
      rows: 5,
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
      orderId: '',
      headers: [
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Email', value: 'email' },
        { text: 'URL', value: 'url' }
      ],
      orderStatusItems: [],
      orderStatusFields: [
        { text: 'Date Ordered', value: 'date' },
        { text: 'Verfication Type', value: 'verification' },
        { text: 'Account History', value: 'account' },
        { text: 'Refresh Period', value: 'refresh' }
      ],
      infoModel: []
    }
  },
  computed: {
    summarydata() {
      const data = []
      data.push(
        [
          { text: 'Order ID', value: this.orderId },
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
    clickableLink() {
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
    ...mapActions(['addTask', 'removeTask', 'setNotification']),
    onCommandEvent(command) {
      switch (command) {
        case EventCodes.generate:
          this.generateReports(this.orderId)
          break
        case EventCodes.view_transferReport:
          this.downloadOrderFile()
          break
        case EventCodes.view_Refresh:
          this.refreshVoaResult(this.orderId)
          break
      }
    },
    refreshVoaResult(orderId) {
      this.addTask('refresh pdf')
      axios
        .get(
          `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/GetOrderReport?orderId=${orderId}`,
          {
            headers: this.setHeaders()
          }
        )
        .then((response) => {
          if (response.data !== null) {
            this.orderFileId = response.data.orderFieldId
          }
        })
        .finally(() => this.removeTask('refresh pdf'))
    },

    downloadOrderFile() {
      // eslint-disable-next-line no-alert
      this.addTask('download file')
      axios
        .get(
          `https://apim-dev-cpss.azure-api.net/bcr/api/document/download?orderFileId=${this.orderFileId}`,

          {
            headers: this.setHeaders()
          }
        )
        .then((response) => {
          const url = common.downloadFile(
            response.data.fileData,
            response.data.contentType,
            response.data.fileName
          )
          // this.$router.open({
          //   name: 'pdfviewer',
          //   query: {
          //     url
          //   }
          // })
          const routeData = this.$router.resolve({
            name: 'pdfviewer',
            query: { url }
          })
          window.open(routeData.href, '_blank')
        })
        .finally(() => this.removeTask('download file'))
    },

    generateReports(orderId) {
      this.addTask('generate report')
      axios
        .get(
          `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/GetOrderReport?orderId=${orderId}`,
          {
            headers: this.setHeaders()
          }
        )
        .then((response) => {
          this.status = response.data.status
          this.isRefreshPeriod = response.data.isRefreshPeriod
          this.isPdfGenerated = response.data.isPdfGenerated
          this.orderFileId = response.data.orderFieldId
          this.getStatus()
          const respData = response.data || response
          const url = common.downloadFile(
            respData.reportByteArray,
            constant.contentType.pdf,
            `VoA_${respData.orderId}`
          )
          const routeData = this.$router.resolve({
            name: 'pdfviewer',
            query: { url }
          })
          window.open(routeData.href, '_blank')
        })
        .finally(() => this.removeTask('generate report'))
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
      this.statusMessage = 'InProgress'
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
      this.statusMessage = 'InProgress'
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
      this.statusMessage = 'InProgress'
    },

    setHeaders() {
      return {
        'Content-Type': 'application/json',
        // eslint-disable-next-line max-len
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRXh0ZXJuYWxJRCI6ImU4YzI1YzljLTg0OTItNGIzNS05ZGRhLTk2NDVmNmE0ZTQ3ZSIsIlVzZXJJRCI6IjIiLCJDdXN0b21lcklkIjoiMSIsIkZpcnN0TmFtZSI6ImNwc3MiLCJNaWRkbGVJbml0aWFsIjoiSjEiLCJMYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJjcHNzYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDcmVkaXQgUGx1cyBBZG1pbiIsIkxvZ2luU2Vzc2lvbklEIjoiMCIsIkN1c3RvbWVyTmFtZSI6IkNyZWRpdCBQbHVzIiwiUm9sZXMiOiJDcmVkaXQgUGx1cyBBZG1pbiIsImV4cCI6MTY0MTQ3MDQzNywiaXNzIjoiaHR0cHM6Ly9hemFwcC1jcHNzLWRldi1hcGktMDAxLmF6dXJld2Vic2l0ZXMubmV0L2F1dGgiLCJhdWQiOiJodHRwczovL2F6YXBwLWNwc3MtZGV2LWFwaS0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.r9dhN68EoSkLXk4kUyALhX5Pj9cFhZ2uIYV0EY9SpfQ`
      }
    },
    alertMessage() {
      axios
        .get(
          'https://apim-dev-cpss.azure-api.net/bcr/api/document/download?orderFileId=20157',

          {
            headers: this.setHeaders()
          }
        )
        .then((response) => {
          const url = common.downloadFile(
            response.data.fileData,
            response.data.contentType,
            response.data.fileName
          )
        })
    },
    sendMails() {
      this.addTask('sendMail')
      axios
        .post(
          `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/SendMail?orderId=${this.orderId}`
        )
        .then((response) => {
          if (response && response.data.responseStatus === 1) {
            this.setNotification({
              msg: response.data.message,
              type: 'success'
            })
          }
        })
        .catch((error) => {
          this.setNotification({
            msg: 'An Error Occured While Processing Your Request',
            type: 'error'
          })
        })
        .finally(() => this.removeTask('sendMail'))
    }
  },
  mounted() {
    this.addTask('voasummary')
    axios
      .get(
        `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/GetOrderDetails?orderId=${this.$route.params.orderId}`
      )
      .then((response) => {
        this.orderId = response.data.orderId
        this.status = response.data.status
        this.referenceNumber = response.data.referenceNumber
        this.isPdfGenerated = response.data.isPdfGenerated
        this.isRefreshPeriod = response.data.isRefreshPeriod
        this.orderFileId = response.data.orderFieldId
        this.getStatus()
        this.tabledata = [
          {
            name: response.data.borrowerName,
            email: response.data.borrowerEmail,
            url: response.data.url,
            isDisplayMail: this.displayResendEmail
          }
        ]
        this.orderStatusItems = [
          {
            date: '12/01/2022',
            verification: response.data.verificationType,
            account: response.data.accountHistory,
            refresh: response.data.refreshPeriod
          }
        ]
        this.infoModel = response.data.orderStatus
      })
      .finally(() => this.removeTask('voasummary'))
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
