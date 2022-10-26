window.addEventListener('load',() => {
    document.getElementById('sign-up-button').addEventListener('click', () => {
        let addName = document.getElementById('username').value;
        let addPword = document.getElementById('password').value;

        let obj = {
            "user" : addName,
            "pword" : addPword
        };
        console.log(obj);

        let jsonData = JSON.stringify(obj);

        fetch('/addUser', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
    })

    document.getElementById('user-info').addEventListener('click', () => {
        fetch('/userInfo')
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
            for(let i = 0; i < data.data.length; i++){
                let string = "username: " + data.data[i].username + "<br>password: " + data.data[i].password;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('all-users').appendChild(elt);
            }
        })
    })

    document.getElementById('log-in-button').addEventListener('click', () => {
        let logName = document.getElementById('log-name').value;
        let logPword = document.getElementById('log-pword').value;
        let informtext = document.getElementById('log-result');
        fetch('/userInfo')
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
            for(let i = 0; i < data.data.length; i++){
                if (logName == data.data[i].username){
                    if (logPword == data.data[i].password){
                        informtext.innerHTML = "success";
                    } else {
                        informtext.innerHTML = "failed";
                    }
                } else {
                    informtext.innerHTML = "user not found";
                }
            }
        })
    })
})
