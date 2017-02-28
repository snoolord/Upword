
document.getElementById('winston-zhao').addEventListener('click', function () {
    chrome.tabs.create({url: 'http://winstonzhao.com'})
})

document.getElementById('linked-in').addEventListener('click', function () {
    chrome.tabs.create({url: 'https://www.linkedin.com/in/winstonjzhao/'})
})

document.getElementById('github').addEventListener('click', function () {
    chrome.tabs.create({url: 'https://github.com/winstonjz/Upword'})
})
