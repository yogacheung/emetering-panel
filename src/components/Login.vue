<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control"  v-model="username" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" @keyup.enter.native="onSubmit" class="form-control" v-model="password" placeholder="Password" autocomplete="current-password"/>
                  </b-input-group>                  
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" v-on:click="onSubmit">Login</b-button>                      
                    </b-col>                    
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" v-b-modal.modal1>Forgot password?</b-button>                    
                      <!-- Modal Component -->
                      <b-modal id="modal1" centered title="Request reset password" ok-title="Send" @ok="onReset">
                        <p class="my-4">
                          <b-input-group prepend="Email">
                            <b-form-input v-model="email" @keyup.enter.native="onReset"></b-form-input>
                          </b-input-group>
                        </p>
                      </b-modal>
                    </b-col>
                  </b-row>                  
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Invisible Fun Studio</h2>
                  <p>eMetering user panel.</p>
                  <p><b-button variant="primary" class="active mt-3" v-b-toggle.collapse2>Contact Us</b-button></p>
                  <!-- element to collapse -->                  
                  <b-collapse id="collapse2">
                    <b-card bg-variant="dark">
                      Email : fun@invisiblefun.com
                    </b-card>
                  </b-collapse>                               
                </div>      
                <div v-if="loading" style="height: 120px; text-align: center; padding: 20px;">
                  <letter-cube :size="80"></letter-cube>   
                </div>
              </b-card-body>              
            </b-card>
          </b-card-group>
        </b-col>        
      </b-row>      
    </div>
  </div>
</template>

<script>
import {LetterCube} from 'vue-loading-spinner';

export default {
  components: {
    LetterCube
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      incorrect: false,
      loading: false 
    }
  },
  methods: {
    onSubmit () {     
      var self = this;             
      this.loading = true;

      //*** Development ***
      //this.$http.post('http://210.3.154.206:8880/api/login', {
      //*** Production ***
      this.$http.post('/api/login',{        
          name: this.username,
          password: this.password        
      })
      .then(function (response) {        
        // console.log(response.data[0]);        
        if(response.data[0]){
          self.$router.push('/dashboard');
          self.loading = false;
        }else {
          incorrect = true;
          self.password = '';
          self.loading = false;
        }                              
      })
      .catch(function (error) {
        self.loading = false;
        console.log(error);
      });
    },
    onReset () {
      var self = this;       
      // console.log(this.email);
      this.$http.post('/api/resetpw',{        
          email: this.email,          
      })
      .then(function (response) {        
        console.log(response.data[0]);        
      })
      .catch(function (error) {
        console.log(error);
      });
    }    
  }
}
</script>

<style scoped>
.row {
  margin-top: 20%;
}
</style>
