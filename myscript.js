$(document).ready(function(){


function formatCurrency(num) {
num = num.toString().replace(/\$|\,/g,'');
if(isNaN(num))
num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
return (((sign)?'':'-') + '$' + num + '.' + cents);
}



function start_jma() {

    if ($('[name="username"]').length) {
      $('[name="username"]').val(passwords.jma.username)
      $('[name="password"]').val(passwords.jma.password);
      $('[value="login"]').click()
      
    }
    
    if (location.toString() == "http://dealer.jmagroup.com/jmfsdpweb/" || location.toString() == "https://dealer.jmagroup.com/jmfsdpweb/" ) {
       
        location = "http://autorates.jmfamily.com/autorates/index.jsp";
    } else {
        
    }

   if (location.toString() == "http://autorates.jmfamily.com/autorates/index.jsp") {
        
        
        setInterval(function(){
            var cell = $('.dataTableColumnRight:not(.doctored)')
            cell.each(function() {
                var text = $(this).text()
                
                if (text.match(/\$/)) {
                    text = text.replace("$", '').replace(',',"")
                    text = text - 0 + 700;
                    text = formatCurrency(text)
                }
                $(this).text(text)
                $(this).addClass("doctored");
                $(this).nextAll('a').remove()
            })
            
        
        }, 1000)
        
        //alert("here")
        info = JSON.parse(window.name)
        vin = info.vin
        miles = info.miles
        
        $('input[type="text"]').filter(function(){
            return this.id.match(/VIN/)
        }).val(vin)
        
        $('input[type="text"]').filter(function(){
            return this.id.match(/StartingMileage/)
        }).val(miles)
        
        
        var js_code = $('input').filter(function(){
            return this.id.match(/ProductSearchButton/)
        }).attr('onclick')
        js_code  = js_code.toString().split('\n')[1]
        console.log(js_code)
        location.href = "javascript: " + js_code
        
   } 
}



function on_our_inv() {

    $('a').live('click', function(e){
        if ($(this).text() == "warranty") {
           var carinfo = $(this).parents(".carinfo")
           var miles = carinfo.find('.miles').text().split(" ")[0]
           var vin = carinfo.find(".vin").text()
           window.open("http://dealer.jmagroup.com", JSON.stringify({'vin': vin, 'miles': miles}))
            return false;
        }
        
        
    })
    
    
  
  
}


var loc = location.toString();

if (location.toString().match(/jm/)) {
    if (window.name) {
    start_jma();
    }
} else if (location.toString().match(/govw/)) {
   
    on_our_inv()
} else if (contains(loc,"karpower")) {
    
    if (contains($(document.body).html(), "Server Error in '/' Application.")) {
      deleteAllCookies();
      //location.href = "http://karpower.com";
    }
    
    if (session()['logged in'] != true) {
        
        if ( $('#Login1_TextBoxUserName').length > 0) {
            $('#Login1_TextBoxUserName').val(passwords.kbb.username)
            $('#Login1_TextBoxPassword').val(passwords.kbb.password)
            $('#Login1_ButtonLogin').click();
            save('logged in', "second");
        }
    } else if (session()['logged in'] == 'second'){
        if ( $('#Login1_TextBoxUserName').length > 0) {
            $('#Login1_ButtonLogin').click();
            save('logged in', true);
        }
        
    }
    
    
    if ($('#ctl00_ctl00_rc_ws_InventoryGrid_GridViewInventory_ctl01_cbxSelectAll').length > 0) {
        $('#ctl00_ctl00_rc_ws_InventoryGrid_GridViewInventory_ctl01_cbxSelectAll').click();
        
        call_onclick_code($('[name="ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport"]'));
        $('[name="ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport"]').click();
        
        
        //js = $('[name="ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport"]').attr('onclick')
        //location.href = 'javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport", "", true, "", "", false, false))';
        //document.createElement('script');
        //$('document.body').append('<script>WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport", "", true, "", "", false, false))</script>')
        //$('document.body').append("<script>alert('yo dudde')</script>")
        //location.href = 'javascript:javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport", "", true, "", "", false, false)); alert("done")';
        //location.href = 'javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport", "", true, "", "", false, false))';
        //eval('WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$rc$ws$InventoryBottomButtons$btnExport", "", true, "", "", false, false))')
        //location.href = "javascript:";
    }
    
    if ($('#ctl00_ctl00_rc_ws_FileExport_gridViewFileExport_ctl04_lbtnExecute').length > 0) {
        call_href_code($('#ctl00_ctl00_rc_ws_FileExport_gridViewFileExport_ctl04_lbtnExecute'))
    } else if ($('#ctl00_ctl00_rc_ws_lbSaveExport').length > 0) {
        call_href_code($('#ctl00_ctl00_rc_ws_lbSaveExport'));
    }
    
    
}

function call_href_code(el) {
  var js_code = $(el).attr('href');
  location.href = js_code
}

function call_onclick_code(el) {
  var js_code = $(el).attr('onclick')
        js_code  = js_code.toString().split('\n')[1]
        console.log(js_code)
        location.href = "javascript: " + js_code
}









function onText(data) {
  console.log(data)
}


//chrome.extension.sendRequest({'action' : 'load-file'}, onText);


})



function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}




function session(){
  try {
  return JSON.parse(window.name);
  } catch(e) {
    return {}
  }
}
function save(a,b) {
  var name = session();
  name[a] = b;
  window.name = JSON.stringify(name);
}








function contains(s,w) {
  return s.indexOf(w) != -1
}



function rnd(low, high) {
   return Math.floor(Math.random() * (high-low+1)) + low
}

  function tokenize(line) {    
    line = line.split("");
    i = 0;
    var state = "out";
    var cur_token = []
    var tokens = [];
    var last_chr = "";
   
    while (i < line.length) {
        chr = line[i];
        if (chr == " " && state == "out") {
            tokens.push(cur_token.join(""))
            cur_token = []
        } else if (chr == '"' && state == "out") {
            state = "in";
            cur_token.push("'")
        } else if (chr == '"' && state == "in" && last_chr != "\\") {
            state = "out";
        } else if (chr.match(/:/) && state == "out") {
           tokens.push(cur_token.join(""))
           tokens.push(chr)
           cur_token = []
        } else {
             cur_token.push(chr)
        }
        
        last_chr = chr;
        i++
    }
    if (cur_token.length > 0) {
        tokens.push(cur_token.join(""))
    }
    return tokens
}

function array_split(splitter, arr) {
    var ret = []
    var cur = []
    var word;
    for (var i in arr) {
        word = arr[i];
        if (word == splitter) {
          if (cur.length > 0) {
            ret.push(cur)
          }
          cur = []
        } else {
          cur.push(word)
        }
    }
    if (cur.length > 0) {
        ret.push(cur)
    }
    
    return ret;
}

//counting keys in an object
function count(foo) {
    var count = 0;
    for (var k in foo) {
        if (foo.hasOwnProperty(k) && k != "toJSON") {
           ++count;
        }
    }
    return count;
}

function _s(val, start, end) {
  var need_to_join = false;
  var ret = []
  if (typeof val == "string") {
    val = val.split("")
    need_to_join = true;
  }
  if (start >= 0) {
  } else {
      start = val.length + start
  }
  
  if (end == null) {
     ret = val.slice(start)
  } else {
      if (end < 0) {
        end = val.length + end; 
      } else {
        end = end + start
      }
      ret = val.slice(start, end)
  }
    
  if (need_to_join) {
      return ret.join("")
  } else {
      return ret;
  }
}


function _sup(s,o) {
    return s.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

