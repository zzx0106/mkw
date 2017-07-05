<template>
  <div>
    <ul>
      <li v-for="(item,index) in items">
        {{urls[index]}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        testStr: '第24集|--|caa9259dd246e1c15c740501c0442e31#@@#第23集|--|ced59a64085c84fce33d875be8b41634#@@#第22集|--|a27fb259f66a21d824554d0aa07c5709#@@#第21集|--|a272b9a5af85eac49e2c070d0701d6f0#@@#第20集|--|ad876d72bfeb7fcf2156efc08764943e#@@#第19集|--|72fcbac221c6c72c4b95da15ee3947ff#@@#第18集|--|cf04c5c21b0d76dc38a62e6b3032a3dd#@@#第17集|--|2d3cb419f53550319dde6c8387535fce#@@#第16集|--|dbf8678a4e4c5944d71a10f8a3829daf#@@#第15集|--|64c773cc3f5fa366dcbdb78a9820b829#@@#第14集|--|8ab66198ed7c1554d3961ccee4a22738#@@#第13集|--|9f8d1582b3f0404f9c681e308fe15294#@@#第12集|--|3f33ff111e004467ce2fa4152efeccc1#@@#第11集|--|c0fcc591dc47a436b64e834dd88003ec#@@#第10集|--|35774a4e20add7692ce4a5fdca2494d6#@@#第9集|--|4bf447536681b3245233b328880e9138#@@#第8集|--|1922386f5ff41760238eacf48f99ac77#@@#第7集|--|d793da9ed5f9478862e35a2db2931994#@@#第6集|--|fc6f2993dced143db99d279bed0a8c68#@@#第5集|--|d0eec2e261c9802e7569f023c9a9514f#@@#第4集|--|2d6d76d94bcf9426a3550a1e9ca9d256#@@#第3集|--|b8899d1eb9a30c6641a801759abb9c5f#@@#第2集|--|9b26c5a2f50c3ba05da70093c230c67d#@@#第1集|--|8a9492fd24218d2dbcbbb3abf45790f6',

      }
    },
    computed:{
    },
    mounted() {
        var list =this.testStr.split('#@@#');
        var jishu = new Array();
        var url = new Array();
        list.forEach(function (item,index) {
            jishu[index] = item.split('|--|')[0];
          url[index] = item.split('|--|')[1];
        })
      this.items = jishu;
      this.urls = url;

    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
