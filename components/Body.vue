<template>
  <div class="body px-2 px-md-5">
    <Row :gutter="16">
      <Col span="18" :lg="{ span: 18 }" :md="{ span: 16 }" :xs="{ span: 24 }">
        <BreadcrumbNav />
        <router-view />
      </Col>
      <Col span="6" :lg="{ span: 6 }" :md="{ span: 8 }" :xs="{ span: 0 }">
        <InfoNotice />
        <InfoTime class="d-none d-lg-block" />
        <InfoTalk />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.body{
    min-height: 60vh;
}</style>
