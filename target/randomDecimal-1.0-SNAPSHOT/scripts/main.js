(function() {
    var oNumber = document.getElementById('number');

    function init(){
        console.log('init');
        window.setInterval(function() {
            getData();
        }, 1000)
    }

    function getData() {
        let opt = {
            method: 'GET',
            url: './random',
            data: null,
            message: 'get random number'
        }
        serverExecutor(opt);
    }

    function ajax(opt) {
        var opt = opt || {},
            method = (opt.method || 'GET').toUpperCase(),
            url = opt.url,
            data = opt.data || null,
            success = opt.success || function() {},
            error = opt.error || function() {},

            xhr = new XMLHttpRequest();

        // error checking
        if(!url){
            throw new Error('missing url');
        }

        xhr.open(method, url, true);

        if(!data) {
            xhr.send();
        }else{
            xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
            xhr.send(JSON.stringify(data));
        }

        // success
        xhr.onload = function () {
            // check response
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText))
            } else {
                error()
            }
        }
        // failed
        xhr.onerror = function () {
            throw new Error('The request could not be completed.')
        }
    }

    function serverExecutor(opt) {
        oNumber.innerHTML = 'Ready';
        ajax({
            method: opt.method,
            url: opt.url,
            data: opt.data,
            success: function (res) {
                console.log(res);
                // in case data is null || empty
                if (!res || res.length === 0) {
                    oNumber.innerHTML = 'data is empty!!!';
                } else {
                    oNumber.innerHTML = res;
                }
            },
            error: function () {
                throw new Error('No ' + opt.message + ' data!');
            }
        })
    }
    init();
})()