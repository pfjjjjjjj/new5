    var clock = null;

    var state = 0;

    var speed = 4;

 


        function init(){

            for(var i=0; i<4; i++){

                createrow();

            }



            $('main').onclick = function(ev){

                judge(ev);

            }

 


                clock = window.setInterval('move()', 30);

        }

 

 

        function judge(ev){

            if (ev.target.className.indexOf('black') != -1) {

                ev.target.className = 'cell';

                ev.target.parentNode.pass = 1; 

                score();

            }

        }

 

  

        function fail(){

            clearInterval(clock);

            confirm('你的最终得分为 ' + parseInt($('score').innerHTML) );

        }

 

       

        function creatediv(className){

            var div = document.createElement('div');

            div.className = className;

            return div;

        }

 



        function createrow(){

            var con = $('con');

            var row = creatediv('row'); 

            var arr = creatcell(); 

 

            con.appendChild(row); 

 

            for(var i = 0; i < 4; i++){

                row.appendChild(creatediv(arr[i]));

            }

 

            if(con.firstChild == null){

                con.appendChild(row);

            }else{

                con.insertBefore(row, con.firstChild);

            }

        }

 

        function $(id) {

            return document.getElementById(id);

        }

 


        function creatcell(){

            var temp = ['cell', 'cell', 'cell', 'cell',];

            var i = Math.floor(Math.random()*4);

            temp[i] = 'cell black';

            return temp;

        }

 


        function move(){

            var con = $('con');

            var top = parseInt(window.getComputedStyle(con, null)['top']);

 

            if(speed + top > 0){

                top = 0;

            }else{

                top += speed;

            }            

            con.style.top = top + 'px';

 

            if(top == 0){

                createrow();

                con.style.top = '-100px';

                delrow();

            }else if(top == (-100 + speed)){

                var rows = con.childNodes;

                if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){

                    fail();

                }

            }

        }

 


        function speedup(){

            speed += 2;



        }

 



        function delrow(){

            var con = $('con');

            if(con.childNodes.length == 6) {

                   con.removeChild(con.lastChild);

               }

        }    

 


        function score(){

            var newscore = parseInt($('score').innerHTML) + 1;

            $('score').innerHTML = newscore;

            if(newscore % 10 == 0){

                speedup();

            }

        }

 

    init();