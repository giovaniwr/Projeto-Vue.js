<template>
  <div id="app" class="small-container">
    <img id="image" src="./assets/logo.png" alt="VueJS" />
    <h1>cadastro Details</h1>
    <cadastro-form  @add:cadastro="addcadastro" />

    <cadastro-details v-bind:cadastros ="cadastros"
                      @edit:cadastro="editcadastro"
                      @delete:cadastro="deletecadastro"
    />
  </div>
</template>

<script>

import Home from './views/CadastroHome.vue'
import About from './views/CadastroAbout.vue'

export default {
  name: 'app',
  views: {
    About,
    Home,
  },
  data() {
    return {
      cadastros: [],
    }
  },
  methods: {
    async addcadastro(cadastro) {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(cadastro),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await response.json()
        this.cadastros = [...this.cadastros, data]
    
    },

    async getcadastros() {
         const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
        const data = await response.json()
        this.cadastros = data
    },

    async editcadastro(id, updatedcadastro) {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedcadastro),
          headers: { "Content-type": "application/json; charset=UTF-8" } 
        });

        const data = await response.json()
        this.cadastros = this.cadastros.map(cadastro => (cadastro.id === id ? data : cadastro))
    },

    async deletecadastro(id) {
     
        await fetch (`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE'
        });
        this.cadastros = this.cadastros.filter(cadastro => cadastro.id !== id);
    },
  },
  mounted() {
    this.getcadastros()
  }
  
}
</script>

<style>

#cadastro-details {
  width: 100%;
}

button {
  background: #41b883;
  border: 1px solid #41b883;
}

.delete-button {
  background:#d11a2a;
  border: 1px solid #d11a2a;
}

.small-container {
  max-width: 720px;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;
  margin-left: 10px;
}

</style>
