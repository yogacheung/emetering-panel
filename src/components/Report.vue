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
                <datepicker v-model="startDate.date" :inline="true" class="my-datepicker" calendar-class="my-datepicker_calendar"></datepicker>            
              </b-card>
            </b-col>
            <b-col cols="4">
              <b-card header="Cut-Off Date" class="text-center">
                <datepicker v-model="cutoffDate.date" :inline="true" class="my-datepicker" calendar-class="my-datepicker_calendar"></datepicker>    
              </b-card>    
            </b-col>
            <b-col cols="4">
              <b-card header="Options" class="text-center">
                <b-form-select v-model="selected" :options="options" class="mb-3" />
                <b-button v-on:click="onGenerate">Generate</b-button>              
              </b-card>                  
            </b-col>
          </b-row>
                                            
          <b-row>
            <b-col cols="12">
              <b-card no-body>
                <b-tabs card>
                  <b-tab v-if="selected == 1" title="Month Cut-Off" active>
                    <b-table hover :items="items"></b-table>            
                  </b-tab>
                  <b-tab v-else-if="selected == 2" title="Day" active>
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
      showMonth: false,
      showDay: false,
      selected: 1,
      options: [        
        {value: 1, text: 'Month | By Cut-Off Day'},
        {value: 2, text: 'Day | By Cut-Off Day'},
        {value: 3, text: 'By Date Range'}        
      ],
      items: [{Result: 'No Record'}],
      cutoffDate: {
        date: new Date()
      },
      startDate: {
        date: new Date()
      }
    }
  },
  methods: {
    onGenerate () {
      var self = this;  
      // console.log(this.startDate.date);
      // console.log(this.cutoffDate.date);
      // console.log(this.startDate.date.toISOString().slice(0,10));
      // console.log(this.cutoffDate.date.toISOString().slice(0,10));
      var startDay = this.startDate.date.toISOString().slice(0,10);
      var cutoffDay = this.cutoffDate.date.toISOString().slice(0,10);        
      var url = '/api/';
      if(this.selected == 1) {
        var m = new Date(cutoffDay);
        m.setMonth(m.getMonth() - 1);
        startDay = m.toISOString().slice(0,10);
        url += 'onemonthreport/'+startDay+'/'+cutoffDay;
        this.showMonth = true;
        this.showDay = false;
      }else if(this.selected == 2) {
        url += 'onedayreport/'+cutoffDay;        
        this.showMonth = false;
        this.showDay = true;
      }               
      // console.log(startDay); 
      // console.log(cutoffDay);          
      console.log(url);
      this.$http.get(url)
      .then(function (response) {        
        //console.log(response.data[0]);
        if(response.data[0])
          self.items = response.data;
        else self.items = [{Result: 'No Record'}];              
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
.my-datepicker >>> .my-datepicker_calendar {
  width: 100%;
}
.row .card {
  width: 100%;  
  height: 100%;     
}
</style>