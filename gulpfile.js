
const { task,src } = require('gulp');
const ftp = require('gulp-ftp')
const pkg = require('./package.json')

const config = {
  host: 'static.ftp.xxxx.com',
  port: 21,
  user: 'xxx',
  pass: 'xxxx',
  remotePath:'download/preinstall'
}



task('update',function(){
    const baseDir = `./release/${pkg.version}`
    const yml = `${baseDir}/latest*.yml`
    const exe = `${baseDir}/*.exe`
    console.log('baseDir:',baseDir,yml)
    return src([yml,exe]).pipe(ftp(config))
})


