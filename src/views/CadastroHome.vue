<template>
  <div class="about" id="cadastro-details">
    <p v-if="cadastros.length < 1">
      No cadastros
    </p>
    <table v-else>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cadastro in cadastros" v-bind:key="cadastro.id">
          <td v-if="editing === cadastro.id">
            <input type="text" v-model="cadastro.nome" />
          </td>
          <td v-else>{{ cadastro.nome }}</td>

          <td v-if="editing === cadastro.id">
            <input type="text" v-model="cadastro.cpf" />
          </td>
          <td v-else>{{ cadastro.cpf }}</td>

          <td v-if="editing === cadastro.id">
            <input type="text" v-model="cadastro.telefone" />
          </td>
          <td v-else>{{ cadastro.telefone }}</td>

          <td v-if="editing === cadastro.id">
            <input type="text" v-model="cadastro.email" />
          </td>
          <td v-else>{{ cadastro.email }}</td>

          <td v-if="editing === cadastro.id">
            <button @click="editcadastro(cadastro)">Save</button>
            <button @click="cancelEdit(cadastro)" class="muted-button">Cancel</button>
          </td>

          <td v-else>
            <button @click="editMode(cadastro)">Edit</button>
            <button @click="$emit('delete:cadastro', cadastro.id)" class="delete-button">Delete</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    nome: 'cadastro-details',
    props: {
      cadastros: Array,
    },

    data() {
      return {
        editing: null,
      }
    },

    methods: {
      editMode(cadastro) {
        this.cachedcadastro = Object.assign({}, cadastro)
        this.editing = cadastro.id
      },

      cancelEdit(cadastro) {
        Object.assign(cadastro, this.cachedcadastro)
        this.editing = null
      },

      editcadastro(cadastro){
        if(cadastro.nome === '' || cadastro.cpf === '' || cadastro.telefone === '' || cadastro.email === '') return
        this.$emit('edit:cadastro', cadastro.id, cadastro)
        this.editing = null        
      },

    }
  }
</script>

<style scoped>
button {
  margin: 0 0.5rem 0 0;
}

input {
  margin: 0;
}

.empty-table {
  text-align: center;
}
</style>