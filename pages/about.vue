<template>
  <div class="py-5 text-white content-area overflow-hidden">
    <div class="row">
      <div class="col-md-6">
        <!-- Left -->
        <div class="d-flex my-3 my-md-5">
          <img
            src="~assets/images/about.jpg"
            alt="about-image"
            class="w-50 w-md-75 mx-auto border border-4 border-white rounded-circle shadow-lg align-self-center"
          />
        </div>
      </div>
      <div class="col-md-6">
        <!-- Right -->
        <div
          class="d-flex flex-column my-3 my-md-5 pt-md-5 justify-content-center"
        >
          <h2 class="display-4 mx-auto">About Stock Tracker</h2>
          <div class="mb-3 mx-auto mx-md-2">
            <p>Stock Price Web App</p>
            <p>Version: 0.1.0(In Development)</p>
            <p>Made by: Bobby Kim</p>
          </div>
          <div class="d-flex mx-auto">
            <li>
              <a
                href="https://github.com/bobbykim89"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-github-square" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bobby-kim-9baa17165/"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fab fa-linkedin" />
              </a>
            </li>
            <li>
              <a
                href="mailto:bobby.sihun.kim@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fas fa-envelope-square" />
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.content-area {
  min-height: 80vh;
}
.border-4 {
  border-width: 4px !important;
}
p {
  font-size: 1.2rem;
  margin-bottom: 0;
}
li {
  list-style-type: none;
  margin-right: 1rem;
}
a {
  text-decoration: none;
  color: #fff;
  font-size: 3rem;
}
a:hover {
  color: rgb(241 245 249);
}

@media (max-width: 767px) {
  .display-4 {
    font-size: 2.5rem !important;
  }
}
</style>
