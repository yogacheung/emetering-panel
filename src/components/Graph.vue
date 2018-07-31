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
            <b-card class="text-center">
              <h1><b-badge pill variant="success">Online</b-badge> {{punit}}</h1>
            </b-card>
          </b-col>
          <b-col cols="4">
          </b-col>        
        </b-row>
        <b-row> 
          <b-col cols="4">
            <div class="bg1">          
              <b-card text-variant="white">
                  <h4>Begin Reading</h4>
                  <h3 class="text-center">  
                    {{items.Minread}} kWh
                  </h3>
              </b-card>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="bg3">          
              <b-card text-variant="white">
                  <h4>Last Reading</h4>
                  <h3 class="text-center">  
                    {{items.Maxread}} kWh
                  </h3>
              </b-card>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="bg2">          
              <b-card text-variant="white">
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
            <b-card header="Weekly" class="text-center">
              <line-chart :chart-data="dataweekly"></line-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="2 Weeks" class="text-center">
                    <line-chart :chart-data="linedate"></line-chart>
            </b-card>
          </b-col>
          <b-col cols="4">  
            <b-card header="Last 14 Days" class="text-center">
                <bar-chart :chart-data="datacollection"></bar-chart>
            </b-card>
          </b-col>          
        </b-row>  
        <b-row>
          <b-col cols="4">  
            <b-card header="Comparison" class="text-center">
                <bar-chart :chart-data="compare"></bar-chart>
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

export default {
  name: 'graph',
  components: {
    NavBar,
    LineChart,
    BarChart
  },
  data () {
    return {
      punit: '', 
      items: [],      
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

      this.$http.get('http://localhost:3000/unitinfo/'+this.punit)
      .then(function (response) {        
        // console.log(response.data[0]);
        if(response.data[0])
          self.items = response.data[0];                  
      })
      .catch(function (error) {
        console.log(error);
      });

      this.$http.get('http://localhost:3000/lastndays/'+this.punit+'/14')
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

          self.datacollection = {
            labels: clabels,
            datasets: [
              {
                label: 'Reading',
                backgroundColor: '#5DADE2',
                data: cdata
              }
            ]
          }
          self.linedate = {
            labels: clabels,            
            datasets: [
              {
                label: 'Reading',
                fill: false,
                borderColor: '#5DADE2',
                data: cdata,                
              }
            ],
            options: {
              legend: {
                display: false
              }
            }
          }

          var wdata = cdata.slice(0, 6);
          var wlabels = clabels.slice(0, 6);
          var lwdata = cdata.slice(7, 13);
          var lwlabels = clabels.slice(7, 13);
          cweek = cweek.slice(0, 6);
          
          self.dataweekly = {
            labels: wlabels,
            datasets: [
              {
                label: 'Reading',
                fill: false,
                borderColor: '#5DADE2',
                data: wdata
              }
            ]
          } 
          
          self.compare = {
            labels: cweek,
            datasets: [
              {
                label: 'This Week',
                backgroundColor: '#5DADE2',
                data: wdata
              },{
                label: 'Last Week',
                backgroundColor: '#48C9B0',
                data: lwdata
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
