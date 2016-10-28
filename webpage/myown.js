//読み込み時の表示
window_load();

//ウィンドウサイズ変更時に更新
window.onresize = window_load;

//サイズの表示
function window_load() {
  document.getElementById('topimage').style.height
    = (window.innerHeight - document.getElementById('header').clientHeight) + "px";
    // console.log(window.innerHeight - document.getElementById('header').clientHeight);
}