//Set the nedded element for the production
const axios = require('axios');

var exec = require('child_process').exec;

//Use to set the downloadAll using argument
const downloadAll = process.argv.includes('-d') ? process.argv[process.argv.indexOf('-d')] : "false"
downloadAll ? console.log(`downloadAll is currently ${downloadAll} with that mode nothing will be download in the repos folder`) : console.log(`The repositories will be downloaded in the repos folder`)

//Use to set the username using argument
const username = process.argv.includes('-u') ? process.argv[process.argv.indexOf('-u')+1] : "none" //You can also change the none to your own username so you won't need to use the argument
if(username === "none") console.error("Please enter a username using the -u argument")

//Use to set the token using argument
const token = process.argv.includes('-t') ? process.argv[process.argv.indexOf('-t')+1] : "none" //You can also change the none to your own token so you won't need to use the argument
if(token === "none") console.error("Please enter a token using the -u argument")

//user to set the only organization using argument
const onlyOrgas = process.argv.includes('-o') ? process.argv[process.argv.indexOf('-o')+1] : "none"



const getReposUrl = `https://api.github.com/user/repos`

getRepos(username, token, getReposUrl)

async function getRepos(username, token, url) {
    const fetched = await axios.get(url, {
        auth: {
            username: username,
            password: token
        }
    }).catch(err => console.log(err))

    if(!fetched.data[0]) console.log(fetched.data)
    fetched.data.forEach(async repos => {
        if(onlyOrgas !== "none" && !repos.full_name.includes(onlyOrgas)) return
        if(downloadAll !== "false"){
            exec(`bash install.sh ${repos.owner.login} ${token} ${repos.name} `)
        }
        console.log(`${repos.visibility} - ${repos.full_name}`)
    })
}
