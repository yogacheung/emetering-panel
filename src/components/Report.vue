<template>
<div>
  <b-row>
    <b-col>
      <NavBar></NavBar>
    </b-col>
  </b-row>
  <b-row>          
        <b-card header="Report" header-tag="header" footer="Powered by IFS @2018" footer-tag="footer">  
            
          <b-row>
            <b-col cols="4">
              <b-card header="Start Date" class="text-center">                
                <datepicker v-model="startDate.date" :inline="true"></datepicker>            
              </b-card>
            </b-col>
            <b-col cols="4">
              <b-card header="Cut-Off Date" class="text-center">
                <datepicker v-model="cutoffDate.date" :inline="true"></datepicker>    
              </b-card>    
            </b-col>
            <b-col cols="4">
              <b-button v-on:click="onGenerate">Generate</b-button>              
            </b-col>
          </b-row>
                                            
          <b-row>
            <b-col cols="12">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="By Month" active>
                    <b-table hover :items="items"></b-table>            
                  </b-tab>
                  <b-tab title="Tab 2">
                    <b-table hover :items="items"></b-table>            
                  </b-tab>
                </b-tabs>
              </b-card>                      
            </b-col>
          </b-row>              
        </b-card>                                
    </b-row>
    </div>
</template>

<script>
import NavBar from './Navbar.vue';
import Datepicker from 'vuejs-datepicker';
const now = new Date();

export default {
  components: {
    NavBar,
    Datepicker
  },
  data () {
    return {
      items: null,
      cutoffDate: {
        date: new Date()
      },
      startDate: {
        date: now.setMonth(now.getMonth() - 1)        
      }
    }
  },
  methods: {
    onGenerate () {
      var self = this;    
      // console.log(this.startDate.date.toISOString().slice(0,10));
      // console.log(this.cutoffDate.date.toISOString().slice(0,10));
      //this.$http.get('http://localhost:3000/genreport/2017-11-28/2018-01-20')
      this.$http.get('/api/genreport/'+this.startDate.date.toISOString().slice(0,10)+'/'+this.cutoffDate.date.toISOString().slice(0,10))
      .then(function (response) {        
        console.log(response.data[0]);
        if(response.data[0])
          self.items = response.data;                  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.col {
  padding-right: 0px;
}
.col-4{
  margin-bottom: 20px;
}
.vdp-datepicker {
  padding-left: 20%;
}
.row .card {
  width: 100%;  
  height: 100%;     
}
</style>