<template>
  <div>
    <b-row>
      <b-col>
        <NavBar></NavBar>
      </b-col>
    </b-row>
    <b-row>             
      <b-card header="Unit Details" header-tag="header" footer="Powered by IFS @2018" footer-tag="footer"> 
        <b-row>
          <b-col cols="4">
          </b-col>
          <b-col cols="4">
            <b-card class="text-center" border-variant="dark">
              <h1><b-badge pill variant="success">Online</b-badge> {{punit}}</h1>
            </b-card>
          </b-col>
          <b-col cols="4">
          </b-col>        
        </b-row>
        <b-row> 
          <b-col cols="4">
            <div class="bg1">          
              <b-card text-variant="white" border-variant="secondary">
                  <h4>Begin Reading</h4>
                  <h3 class="text-center">  
                    {{items.Minread}} kWh
                  </h3>
              </b-card>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="bg3">          
              <b-card text-variant="white" border-variant="secondary">
                  <h4>Last Reading</h4>
                  <h3 class="text-center">  
                    {{items.Maxread}} kWh
                  </h3>
              </b-card>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="bg2">          
              <b-card text-variant="white" border-variant="secondary">
                  <h4>Accumlated Reading</h4>
                  <h3 class="text-center">  
                    {{items.Accum}} kWh
                  </h3>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <b-row> 
          <b-col cols="4">  
            <b-card header="Last Month" class="text-center">
              <line-chart :chart-data="monthlinedata"></line-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="Weekly" class="text-center">
                    <line-chart :chart-data="weeklylinedata"></line-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="Last Week" class="text-center">
                <bar-chart :chart-data="lastweekdata"></bar-chart>
            </b-card>
          </b-col>          
        </b-row>  
        <b-row>
          <b-col cols="4">  
            <b-card header="First 2 Weeks" class="text-center">
                <bar-chart :chart-data="f2weeksdata"></bar-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="Last 2 Weeks" class="text-center">
                <h-bar-chart :chart-data="l2weeksdata"></h-bar-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="Last Week" class="text-center">
                <doughnut :chart-data="doughnutdata"></doughnut>
            </b-card>
          </b-col>    
        </b-row>        
      </b-card>                                
    </b-row> 
  </div>
</template>

<script>
import NavBar from './Navbar.vue'
import LineChart from '@/charts/LineChart.js'
import BarChart from '@/charts/BarChart.js'
import HBarChart from '@/charts/HBarChart.js'
import Doughnut from '@/charts/Doughnut.js'

export default {
  name: 'graph',
  components: {
    NavBar,
    LineChart,
    BarChart,
    HBarChart,
    Doughnut
  },
  data () {
    return {
      punit: '', 
      items: [],
      monthlinedata: null,
      weeklylinedata: null,      
      lastweekdata: null,    
      f2weeksdata: null,      
      l2weeksdata: null, 
      doughnutdata: null,
      
      datacollection: null,
      linedate: null,
      dataweekly: null,
      compare: null
    }
  },
  mounted () {
    this.onLoad();
  },
  methods: {
    onLoad () {
      var self = this;
      this.punit = this.$router.currentRoute.query.unit;
      // console.log(this.punit);

      this.$http.get('/api/unitinfo/'+this.punit)
      .then(function (response) {        
        // console.log(response.data[0]);
        if(response.data[0])
          self.items = response.data[0];                  
      })
      .catch(function (error) {
        console.log(error);
      });

      //this.$http.get('/api/lastndays/'+this.punit+'/14')
      this.$http.get('/api/lastmonth/'+this.punit)      
      .then(function (response) {        
        // console.log(response.data[0]);
        if(response.data[0]){
          var data = response.data;
          var cdata = [];
          var clabels = [];
          var cweek = [];

          data.forEach(function(item) {
            clabels.push(item.Date);
            cdata.push(item.Reading);
            cweek.push(item.Week);
          });
          // console.log(clabels);
          // console.log(cdata);
          // console.log(cweek);
          var w1data = cdata.slice(0, 6);
          var w1labels = clabels.slice(0, 6);
          var w2data = cdata.slice(7, 13);
          var w2labels = clabels.slice(7, 13);
          var w3data = cdata.slice(14, 20);
          var w3labels = clabels.slice(14, 20);
          var w4data = cdata.slice(21, 27);
          var w4labels = clabels.slice(21, 27);
          cweek = cweek.slice(0, 6);

          // Month data
          self.monthlinedata = {
            labels: clabels,
            datasets: [
              {
                label: 'Reading',
                fill: false,
                borderColor: '#5DADE2',                
                data: cdata
              }
            ]
          }
          // Weekly Data
          self.weeklylinedata = {
            labels: cweek,
            datasets: [
              {
                label: 'Week 1',
                fill: false,
                borderColor: '#5DADE2',                
                data: w1data
              },
              {
                label: 'Week 2',
                fill: false,
                borderColor: '#C39BD3',                
                data: w2data
              },
              {
                label: 'Week 3',
                fill: false,
                borderColor: '#F1948A',                
                data: w3data
              },
              {
                label: 'Week 4',
                fill: false,
                borderColor: '#82E0AA',                
                data: w4data
              },
            ]
          }

          self.lastweekdata = {
            labels: w4labels,
            datasets: [
              {
                label: 'Reading',
                backgroundColor: '#5DADE2',
                data: w4data
              }
            ]
          }

          self.f2weeksdata = {
            labels: cweek,
            datasets: [
              {
                label: 'Week 1',
                backgroundColor: '#5DADE2',
                data: w1data
              },{
                label: 'Week 2',
                backgroundColor: '#48C9B0',
                data: w2data
              }
            ]
          } 

          self.l2weeksdata = {
            labels: cweek,
            datasets: [
              {
                label: 'Week 3',
                backgroundColor: '#5DADE2',
                data: w3data
              },{
                label: 'Week 4',
                backgroundColor: '#48C9B0',
                data: w4data
              }
            ]
          } 
          self.doughnutdata = {
            labels: cweek,
            datasets: [
              {
                label: 'Reading',
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#00A600',
                  '#5DADE2',
                  '#48C9B0',
                  '#82E0AA'
                ],             
                data: w4data
              }
            ]
          }    
        }          
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
.row .card {
  width: 100%;  
  height: 100%;  
}
.col-4{
  margin-bottom: 20px;
}
.bg1 .card {   
  width: 100%; 
  background-image: url("../assets/bg1.png");
  background-size: cover;
  margin-bottom: 1.5rem;
}
.bg2 .card {    
  width: 100%;
  background-image: url("../assets/bg2.png");
  background-size: cover;
  margin-bottom: 1.5rem;
}
.bg3 .card {  
  width: 100%;  
  background-image: url("../assets/bg3.png");
  background-size: cover;
  margin-bottom: 1.5rem;
}
</style>
