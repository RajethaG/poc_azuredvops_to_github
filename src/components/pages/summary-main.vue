<template>
  <v-container>
    <v-flex xs12 md12>
      <page-title text="VOA Order Summary" />
      <v-btn @click="alertMessage" class="primary darken-2 justify-content-left"
        >DownLoad Report</v-btn
      >
    </v-flex>
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
import { mapActions } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseTable
  },
  data() {
    return {
      summarydata: [],
      rows: 5,
      tabledata: [],
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
  methods: {
    ...mapActions(['addTask', 'removeTask', 'setAlert']),
    alertMessage() {
      this.setAlert({
        msg: 'Download is currently unavailable ',
        showErrorMessage: true
      })
    }
  },
  mounted() {
    this.addTask('voasummary')
    axios
      .get(
        `https://apim-dev-cpss.azure-api.net/consumerreport/api/VOA/GetOrderDetails?orderId=${this.$route.params.orderId}`
      )
      .then((response) => {
        this.summarydata = [
          [
            { text: 'Order ID', value: response.data.orderId },
            { text: 'Status', value: 'In Progress' }
          ],
          [
            {
              text: 'Reference Number',
              value: response.data.referenceNumber
            }
          ]
        ]

        this.tabledata = [
          {
            name: response.data.borrowerName,
            email: response.data.borrowerEmail,
            url: response.data.url
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
  background-color: green;
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
