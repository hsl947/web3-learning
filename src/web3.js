/*
 * @Author: your name
 * @Date: 2022-01-20 16:05:11
 * @LastEditTime: 2022-01-20 17:16:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web3-hello-world\src\web3.js
 */
/**
 * 常见的dapp实践
 * 1.检测Metamask并实例化Web3
 * 2.检测Metamask是否已锁定/解锁
 * 3.检查当前网络
 * 4.获取当前帐户
 * 5.获取当前帐户的余额
 * 6.检测当前帐户是否已更改
 * 7.处理取消/确认
 * 8.获取交易收据
 * 9.监听Web3事件
 */
const Web3 = require('web3')

;(async ()=>{
  // window.web3.currentProvider / window.ethereum 能找到一定是要装了metamask或者类似插件
  let currentProvider = null
  let address1 = null
  let address2 = null

  if(window.ethereum) {
    currentProvider = window.ethereum
    // 新版需要请求用户授权
    try {
      await currentProvider.enable()
    } catch (e) {
      alert("用户取消授权")
      return
    }
  } else if(window.web3) {
    currentProvider = window.web3.currentProvider
  } else {
    alert('请先安装 MetaMask')
    // 自定义节点
    // currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
  }

  // provider 就是节点，小狐狸也是一个节点
  const web3 = new Web3(currentProvider || Web3.givenProvider);
  // web3.setProvider(currentProvider)

  // 通过私钥获取地址
  const PRIVATE_KEY = '0x3b0f2b561cc74217ff7dcd01186df6623dfba2b88d84de4eb4bb15a17d148c1c'
  const userWallet = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  console.log('userWallet: ', userWallet);
  address2 = userWallet.address

  // 获取当前的钱包地址
  web3.eth.getAccounts((error, result)=> {
    if (error) {
      alert('获取地址失败')
      return
    }
    console.log('当前连接的地址：',result)
    address1 = result[0]

    // 发送转账
    web3.eth.sendTransaction({
      gas: 21000,
      gasPrice: 5000000000,
      from: address1,
      to: address2,
      value: 10**6
    }, (err, result) => {
      if(err) {
        console.log('转账失败：', err)
        return
      }
      console.log("转账 hash：",result)
    })
  });

  // 监听钱包地址和网络变化
  window.ethereum.on('accountsChanged', (accounts) => {
    console.log("当前账户发生更改：" + accounts)
  })
  window.ethereum.on('networkChanged', (networkVersion) => {
    console.log("当前网络发生更改：" + networkVersion)
  })
})()
