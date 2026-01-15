/* ------------------ 基础布局 ------------------ */
html, body {
    margin: 0; padding: 0; height: 100%;
    font-family: Arial, sans-serif;
    overflow: hidden; transition: background 2s;
}

body {
    display: flex; justify-content: center; align-items: center;
    flex-direction: column; text-align: center;
    position: relative;
    background: linear-gradient(to bottom,#87CEEB,#f0f8ff);
    color: #333;
}

/* ------------------ 天气容器 ------------------ */
#weather {
    background: rgba(255,255,255,0.9);
    border-radius: 25px;
    padding: 25px 30px;
    min-width: 300px;
    max-width: 400px;
    z-index: 2; position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* ------------------ 温度和描述 ------------------ */
#temperature { font-size:50px;margin:10px 0;font-weight:bold; }
#description { font-size:24px;text-transform:capitalize;margin-bottom:10px; }
#icon { width:100px; }

/* ------------------ 预报容器 ------------------ */
#forecast, #hourly { margin-top:20px; max-height:160px; overflow-x:auto; white-space:nowrap; padding-bottom:10px; }

/* ------------------ 每天/每小时天气块 ------------------ */
.day, .hour { display:inline-block; margin:5px 10px; border-radius:12px; background:rgba(255,255,255,0.7); padding:10px; box-shadow:0 5px 15px rgba(0,0,0,0.1); }

/* ------------------ 按钮样式 ------------------ */
button { margin:5px; padding:8px 14px; border:none; border-radius:12px; cursor:pointer; background:#4a90e2; color:white; font-weight:bold; transition:0.3s; }
button:hover { background:#357ABD; }

/* ------------------ 滚动条样式 ------------------ */
::-webkit-scrollbar { height:8px; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.3); border-radius:4px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.3); border-radius:4px; }

/* ------------------ 动画样式 ------------------ */
.rain { position:absolute; width:2px; height:15px; background:rgba(255,255,255,0.6); animation:fall linear infinite; z-index:1; border-radius:2px; }
@keyframes fall { 0%{transform:translateY(-20px);opacity:0;}50%{opacity:1;}100%{transform:translateY(100vh);opacity:0;} }

.snow { position:absolute; width:8px; height:8px; background:white; border-radius:50%; opacity:0.8; animation:snowFall linear infinite; z-index:1; }
@keyframes snowFall {0%{transform:translateY(-10px) translateX(0);}100%{transform:translateY(100vh) translateX(50px);}}

.sun-glow { position:absolute; width:200px; height:200px; border-radius:50%; background:rgba(255,255,0,0.2); top:50px; left:50%; transform:translateX(-50%); animation:glow 3s ease-in-out infinite alternate; z-index:0; }
@keyframes glow {0%{opacity:0.1;}100%{opacity:0.5;}}
