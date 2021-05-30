<template>
  <div>
    <bank-modal>
      <template v-slot:header>
        <h3>ฝาก-ถอน</h3>
      </template>

      <template v-slot:body>
        <form ref="form">
          <b-form-group
            label="เลขบัญชี"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-select v-model="ModalData.accountId" :options="options">
            </b-form-select>
          </b-form-group>

          <b-form-group
            label="ประเภท"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-select v-model="ModalData.type" :options="optionsType">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="จำนวนเงิน"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.monney"
              required
            ></b-form-input>
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
import { mapState } from 'vuex'
import BankModal from './BankModal.vue'
export default {
  components: {
    BankModal,
  },
  data() {
    return {
      nameState: null,
      trasactionDetail: {
        TsAcId: null,
        TsType: null,
        TsMoney: null,
        TsDetail: '',
        TsNote: '',
        TsAD: '',
      },
      ModalData: {
        accountId: '',
        monney: '',
        type: '',
        detail: '',
      },
      postUserId: {
        userId: '',
      },
      options: [
        { value: '', text: '-- กรุณาเลือกเลขบัญชี --', disabled: true },
      ],
      optionsType: [
        { value: '', text: '-- ประเภทรายการ --', disabled: true },
        { value: '1', text: 'ฝาก' },
        { value: '2', text: 'ถอน' },
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
    optionAccount() {
      this.accountData.forEach((element) => {
        this.options.push({
          value: element.acId,
          text: element.acNumber,
        })
      })
    },
    resetModal() {
      ;(this.ModalData = {
        accountId: '',
        monney: '',
        type: '',
        detail: '',
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
      if (
        this.ModalData.accountId == '' ||
        this.ModalData.type == '' ||
        this.ModalData.monney == ''
      ) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
      if (this.ModalData.type == 1) {
        this.trasactionDetail = {
          TsAcId: parseInt(this.ModalData.accountId),
          TsType: parseInt(this.ModalData.type),
          TsMoney: parseFloat(this.ModalData.monney),
          TsDetail: 'ฝากเงิน',
          TsNote: '',
          TsAD: '',
        }
      } else {
        this.trasactionDetail = {
          TsAcId: parseInt(this.ModalData.accountId),
          TsType: parseInt(this.ModalData.type),
          TsMoney: parseFloat(this.ModalData.monney),
          TsDetail: 'ถอนเงิน',
          TsNote: '',
          TsAD: '',
        }
      }
      this.$store
        .dispatch('transaction/depositWithdraw', this.trasactionDetail)
        .then((response) => {
          let status = ''
          if (response.data == 'successdeposit') {
            status = 'ฝากเงินสำเสร็จ'
          } else if (response.data == 'successwithdraw') {
            status = 'ถอนงินสำเสร็จ'
          } else if (response.data == 'error_balance') {
            status = 'ไม่สามารถถอนเงินได้เนื่องจากจำนวนเงินไม่เพียงพอ'
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
  computed: {},
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
