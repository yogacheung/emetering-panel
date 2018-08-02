<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="dashboard">Home</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="report">Report</b-nav-item>      
        <b-nav-item to="setting" disabled>Setting</b-nav-item>      
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right disabled>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">CH</b-dropdown-item>        
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#" disabled>Profile</b-dropdown-item>
          <b-dropdown-item v-b-modal.modalsm>Sign Out</b-dropdown-item>          
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
    </b-navbar>   
    <b-modal id="modalsm" size="sm" title="Sign Out?" hide-footer>    
      <b-btn class="mt-3" variant="outline-danger" block to="/">Confirm</b-btn>
    </b-modal>
  </div> 
</template>

<style scoped>
.navbar {
  width: 100;
}
</style>
