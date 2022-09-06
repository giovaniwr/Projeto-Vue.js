<template>
    <div classe="CadastroHome" id="cadastro-form">
        <form @submit.prevent="handleSubmit">
            <label>Nome:</label>
            <input 
                ref="first"
                type="text"
                :class="{ 'has-error': submitting && isNomeValid }"
                v-model="cadastro.nome"
                @focus="clearStatus"
                @keypress="clearStatus" 
            />
            <label>CPF:</label>
            <input 
                type="text"
                :class="{ 'has-error': submitting && isCpfValid }"
                v-model="cadastro.cpf"
                @focus="clearStatus"
            />
            <label>Telefone</label>
            <input 
                type="text"
                :class="{ 'has-error': submitting && isTelefoneValid }"
                v-model="cadastro.telefone"
                @focus="clearStatus"
            />
            <label>Email</label>
            <input 
                type="text"
                :class="{ 'has-error': submitting && isEmailValid }"
                v-model="cadastro.email"
                @focus="clearStatus"
            />
            <p v-if="error && submitting" class="error-message">
                ❗Por Favor Preencha Corretamente os Campos
            </p>
            <p v-if="success" class="success-message">
                ✅ Cadastro Adicionado Com Sucesso!!!
            </p>
            <button variant="primary">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    nome: 'cadastro-form',
    data() {
        return{
            submitting: false,
            error: false,
            success: false,
            cadastro: {
                nome: '',
                cpf: '',
                telefone: '',
                email: '',
                // cpfReg: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                telReg: /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
                emailReg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()

            if(this.isNomeValid || this.isCpfValid ||this.isTelefoneValid || this.isEmailValid ){
                this.error = true
                return
            }

            this.$emit('add:cadastro', this.cadastro)
            this.$refs.first.focus()
            this.cadastro = {
                nome: '',
                cpf: '',
                telefone: '',
                email: '',
                // cpfReg: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                telReg: /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
                emailReg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            }
            this.error = false
            this.success = true
            this.submitting = false
        },

        clearStatus() {
            this.success = false
            this.error = false
        },
    },
    computed: {
        isNomeValid() {
            return this.cadastro.nome === '';
        },
        isCpfValid() {
            return (this.cadastro.cpf === '') ? true : (this.cadastro.cpfReg.test(this.cadastro.cpf)) ? false : true;
        },
        isTelefoneValid() {
            return this.cadastro.telefone === ''? true : (this.cadastro.telReg.test(this.cadastro.telefone)) ? false : true;
        },
        isEmailValid () {
            return (this.cadastro.email === '') ? true : (this.cadastro.emailReg.test(this.cadastro.email)) ? false : true;
        }
    },
}
</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color:#d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>