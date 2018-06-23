<script>
export default {};
</script>


<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Restaurant Reviews</router-link>
      </h1>
    </nav>
  </header>
</template>

<style scoped >
nav {
  width: 100%;
  height: 8rem;
  background-color: #252831;
  text-align: center;
  display: flex;
}

nav h1 {
  margin: auto;
}

nav h1 a {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 1rem;
  text-transform: uppercase;
}

</style>
