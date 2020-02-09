<template>
  <div>
    <el-row :gutter="20">
      <el-col :sm="0" :md=2 :lg="4" style="display: block;"><div style="width: 1px; height: 1px;"></div></el-col>
      <el-col :sm="24" :md="18" :lg="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>温馨提示喵</span>
          </div>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <el-image :src="imgSrc">
                <div slot="placeholder" class="image-slot">
                  <img src="https://github-imglib-1255459943.cos.ap-chengdu.myqcloud.com/assets/img/loading.gif" style="width: 100%;" />
                </div>
                <div slot="error" class="image-slot">
                  <img src="https://github-imglib-1255459943.cos.ap-chengdu.myqcloud.com/chunzhu.jpg" style="width: 100%;"  />
                </div>
              </el-image>
            </el-col>
            <el-col :xs="24" :sm="12">
              <div class="copyright-text">
                <div>本书采用“保持署名—非商用”<a href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">创意共享4.0许可证</a>。只要保持原作者署名和非商用，您可以自由地阅读、分享、修改本书。</div>
                <div>作者：<a href="https://github.com/godbasin" target="_blank">被删</a></div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
function getImgSoource() {
  return (
    "https://api.thecatapi.com/v1/images/search?format=src&t=" +
    new Date().getTime()
  );
}

export default {
  data() {
    return {
      imgSrc: getImgSoource()
    };
  },
  watch: {
    $route(to) {
      this.imgSrc = getImgSoource();
    }
  }
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.image-slot
  width 100%
  display block

.copyright-text 
  font-size 15px
  color #999
  background #eee
  padding 10px

.copyright-text 
  > div 
    margin-bottom 10px

@media (max-width: $MQMobile)
  .copyright-text 
    font-size 13px
  .el-card__header
    padding 8px 10px
    font-size 13px

</style>
