<template>
<div>
  <b-row>
    <b-col>
      <NavBar></NavBar>
    </b-col>
  </b-row>
  <b-row>                
        <b-card header="eMetering List" header-tag="header" footer="Powered by IFS @2018" footer-tag="footer">                      
          <b-row>            
              <b-col cols="4" v-for="item in items" :key="item.index"> 
                <div v-cloak class="dash">
                <b-card border-variant="success">
                  <div class="ebg">
                    <h3 class="ebg-h3">Unit: {{item.Unit}}</h3>
                  </div>                    
                  <h6>Last Reading : {{item.Datetime}}</h6>
                  <h4>{{item.Reading}} kWh</h4>
                  <b-button v-on:click="onDetail(item.Unit)" variant="success">Details</b-button>                              
                </b-card>
                </div>
              </b-col>            
          </b-row>                   
        </b-card>                                
    </b-row>
    </div>
</template>

<script>
import NavBar from './Navbar.vue'
export default {
  name: 'dashboard',
  components: {  
    NavBar  
  },
  data () {
    return {        
      items: [{"Unit":"loading","Reading":0.0,"Datetime":"loading"}]
    }
  },
  mounted () {
    this.onLoad();
  },
  methods: {
    onLoad () {
      var self = this;    

      this.$http.get('/api/currentreading')
      .then(function (response) {        
        // console.log(response.data[0]);        
        if(response.data[0]){
          self.items = response.data;                                  
        }                    
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    onDetail: function (Unit) {
      // console.log(Unit);
      this.$router.push({path: 'Graph', query: {unit: Unit}})
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
.ebg {  
  width: 100%;
  background-image: url("../assets/dashb.png");
  background-size: cover;
  border-radius: 3px;  
}
.ebg .ebg-h3 {
  color: white;
  padding-top: 30px;
  padding-bottom: 30px;
}
.dash .card .card-body {
  padding-top: 0px;  
  padding-left: 0px;  
  padding-right: 0px;  
  padding-bottom: 15px;  
}
.dash .card {  
  width: 95%;  
  height: 90%;  
  margin-top: 5px;  
  margin-bottom: 5px;  
  margin-left: 5px;  
  margin-right: 5px;  
  text-align: center;
  background-color: #EBF5FB;
}
</style>
