<template>
  <div>
    <bank-modal>
      <template v-slot:header>
        <h3>โอนเงิน</h3>
      </template>
      <template v-slot:body>
        <form ref="form">
          <b-form-group
            label="จาก"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-select
              v-on:change="getBalance(ModalData.tranfer_account)"
              v-model="ModalData.tranfer_account"
              :options="options"
            >
            </b-form-select>
            <span v-if="show" id="hide">ยอดเงินคงเหลือ {{ balance }} THB</span>
          </b-form-group>

          <b-form-group
            label="ไปที่"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.tranfer_payee"
              required
              maxlength="10"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="จำนวนเงิน"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.tranfer_monney"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="หมายเหตุ"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-textarea
              id="textarea-small"
              size="sm"
              v-model="ModalData.tranfer_note"
            >
            </b-form-textarea>
          </b-form-group>
        </form>
      </template>
      <template v-slot:footer>
        <b-button variant="secondary" v-on:click="resetModal">ยกเลิก</b-button>
        <b-button variant="primary" v-on:click="handleOk">บันทึก</b-button>
      </template>
    </bank-modal>
  </div>
</template>

<script>
import BankModal from './BankModal.vue'
export default {
  components: {
    BankModal,
  },
  data() {
    return {
      balance: 0,
      show: false,
      nameState: null,
      ModalData: {
        tranfer_account: '',
        tranfer_payee: '',
        tranfer_monney: '',
        tranfer_detail: '',
        tranfer_note: '',
      },
      trasactionDetail: {
        TsAcId: null,
        TsType: null,
        TsMoney: null,
        TsDetail: '',
        TsNote: '',
        TsAD: '',
      },
      postAccountId: {
        TsAcId: '',
      },
      options: [
        { value: '', text: '-- กรุณาเลือกเลขบัญชี --', disabled: true },
      ],
    }
  },
  props: {
    accountData: Array,
  },
  mounted() {
    this.optionAccount()
  },
  methods: {
    getBalance(Account) {
      this.show = true
      this.postAccountId.TsAcId = Account
      this.$store
        .dispatch('transaction/getBalance', this.postAccountId)
        .then((response) => {
          this.balance = response.data
        })
    },
    optionAccount() {
      this.accountData.forEach((element) => {
        this.options.push({
          value: element.acId,
          text: element.acNumber,
        })
      })
    },

    resetModal() {
      this.show = false
      ;(this.ModalData = {
        tranfer_account: '',
        tranfer_payee: '',
        tranfer_monney: '',
        tranfer_detail: '',
        tranfer_note: '',
      }),
        (this.nameState = null)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-detail')
      })
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      const checkAccountTranfer = this.accountData.find(
        (element) => element.acId == this.ModalData.tranfer_account
      )

      if (this.ModalData.tranfer_account == '' ||this.ModalData.tranfer_monney == '' || this.ModalData.tranfer_payee == '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      } else if (this.ModalData.tranfer_payee.length < 10) {
        alert('กรุณากรอกเลขบัญชีให้ครบ 10 หลัก')
        return
      } else if (this.ModalData.tranfer_payee == checkAccountTranfer.acNumber) {
        alert('กรุณากรอกเลขบัญชีผู้รับให้ไม่ซ้ำกับบัญชีผู้โอน')
        return
      }
      this.trasactionDetail = {
        TsAcId: parseInt(this.ModalData.tranfer_account),
        TsType: 3,
        TsMoney: parseInt(this.ModalData.tranfer_monney),
        TsDetail: 'โอนเงิน',
        TsNote: this.ModalData.tranfer_note,
        TsAD: this.ModalData.tranfer_payee,
      }
      this.$store
        .dispatch('transaction/Transfer', this.trasactionDetail)
        .then((response) => {
          let status = ''
          if (response.data == 'success') {
            status = 'โอนเงินสำเร็จ'
          } else if (response.data == 'error_balance') {
            status = 'ไม่สามารถโอนงินได้เนื่องจากจำนวนเงินไม่เพียงพอ'
          } else {
            status = 'เกิดข้อผิดพลาดในการทำรายการ'
          }
          this.$emit('showRecordingResults', status)
        })
      this.resetModal()
      this.nameState = null
      this.$nextTick(() => {
        this.$bvModal.hide('modal-detail')
      })
    },
  },

  computed: {
    // fullName: {
    //   // getter
    //   get: function () {
    //     return this.firstName + ' ' + this.lastName
    //   },
    //   // setter
    //   set: function (newValue) {
    //     var names = newValue.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[names.length - 1]
    //   },
    // },
  },
}
</script>
<style scoped>
#checkstatus label {
  margin-left: 10px;
}
#two {
  margin-left: 10px;
}
</style>
