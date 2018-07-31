<template>
<div>
  <b-row>
    <b-col>
      <NavBar></NavBar>
    </b-col>
  </b-row>
  <b-row>                
        <b-card header="eMetering List" header-tag="header" footer="Powered by IFS | July 2018" footer-tag="footer">            
          <b-row>            
              <b-col cols="4" v-for="item in items" :key="item.index"> 
                <div class="dash">
                <b-card>
                  <div class="ebg">
                    <h4 class="ebg-h4">Unit: {{item.Unit}}</h4>
                  </div>
                  
                    <p class="card-text">
                        Last Reading:<br> 
                        {{item.Reading}} kWh<br>
                        <b-button v-on:click="onDetail(item.Unit)">Details</b-button>                      
                    </p>                  
                                
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
      items: []     
    }
  },
  mounted () {
    this.onLoad();
  },
  methods: {
    onLoad () {
      var self = this;    

      this.$http.get('http://localhost:3000/currentreading')
      .then(function (response) {        
        // console.log(response.data[0]);
        if(response.data[0])
          self.items = response.data;                  
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
.ebg .ebg-h4 {
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
  background-color: #F2F3F4;
}
</style>
