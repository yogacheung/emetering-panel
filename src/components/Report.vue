<template>
<div>
  <b-row>
    <b-col>
      <NavBar></NavBar>
    </b-col>
  </b-row>
  <b-row>          
        <b-card header="Report" header-tag="header" footer="Powered by IFS | July 2018" footer-tag="footer">  
            
            <datepicker placeholder="Start Day"></datepicker>        
            <datepicker placeholder="Cut-off Day"></datepicker>        
            <b-button>Generate</b-button>              
            
            <b-table hover :items="items"></b-table>            
        </b-card>                                
    </b-row>
    </div>
</template>

<script>
import NavBar from './Navbar.vue'
import Datepicker from 'vuejs-datepicker';
const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    isActive: false,
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson',
    _rowVariant: 'danger'
  },
  {
    isActive: true,
    age: 40,
    first_name: 'Thor',
    last_name: 'Macdonald',
    _cellVariants: { isActive: 'success', age: 'info', first_name: 'warning' }
  },
  { isActive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
]

export default {
  components: {
    NavBar,
    Datepicker
  },
  data () {
    return {
      items: items
    }
  }
}
</script>

<style scoped>
.col {
  padding-right: 0px;
}
.row .card {
  width: 100%;  
  height: 100%;     
}
</style>