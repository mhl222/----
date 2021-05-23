// import aws from 'aws-sdk'

// import request from 'request-promise-native'
// import CryptoJS from 'crypto-js'
// import base64 from 'base-64'
// import imageToBase64 from 'image-to-base64'
aws = require("aws-sdk");
request = require('request-promise-native');
CryptoJS = require("crypto-js")
base64 = require("base-64")
imageToBase64 = require("image-to-base64")

/**
 * Special directory starts with a dot
 * Definations:
 * 
 * .default, it is where all files are placed
 * .recyclebin, it is recyclebin
 * .types, it is where types are store
 */

/**
 * Special File starts with a underline "."
 * Definations:
 * .placeholder, it is a placehoder to emulate the directory, and it is in every directory
 */


// export class UserAccount {
class UserAccount {
    constructor(s3, userName) {
        this.s3 = s3;
        this.bucket = userName
        this.placehoder = ".placeholder"
        this.typePrefix = ".types/"
    }

    /**
     * list all directory names
     * 
     * @returns a list like : ["dir1", "dir2"]
     */
    async listDirectory() {
        let params = {
            Bucket: this.bucket,
            Delimiter: "/"
        }
        let dat;
        try {
            dat = await this.s3.listObjects(params).promise();
        } catch (err) {
            console.log(err)
        }
        return dat["CommonPrefixes"].map(x => {
            let str = x["Prefix"]
            return str.endsWith('/') ? str.slice(0, -1) : str
        }).filter(x => {
            return !(x.startsWith("."))
        });
    }
    /**
     * 
     * @param {string} dn directory name
     * @returns true for success/ false for failure
     */

    async createDirectory(dn) {
        let placehoder = dn + "/" + this.placehoder
        let params = {
            Bucket: this.bucket,
            Key: placehoder,
            Body: placehoder
        };
        let ret = true;
        try {
            await this.s3.putObject(params).promise();
        } catch (err) {
            console.log(err)
            ret = false;
        }
        return ret;
    }

    /**
     * delete a emptry directory
     * 
     * @param {string} dn, directory name
     */
    async deleteDirectory(dn) {
        let placehoder = dn + "/" + this.placehoder
        let params = {
            Bucket: this.bucket,
            Key: placehoder
        }
        let ret = true;
        try {
            await this.s3.deleteObject(params).promise()
        } catch (err) {
            console.log(err)
            ret = false;
        }
        return ret;
    }

    async listTypes() {
        let prefix = this.typePrefix;
        let params = {
            Bucket: this.bucket,
            Prefix: prefix,
            Delimiter: "/"
        }
        let dat;
        try {
            dat = await this.s3.listObjects(params).promise();
        } catch (err) {
            console.log(err)
        }
        console.log(dat)
        return dat["CommonPrefixes"].map(x => {
            let str = x["Prefix"]
            str = str.endsWith('/') ? str.slice(0, -1) : str
            return str.split("/").pop()
        }).filter(x => {
            //return !(x.startsWith("."))
            return true;
        });

    }

    async listFilesByDir(dir) {
        let prefix = dir + "/"
        let param = {
            Bucket: this.bucket,
            Prefix: prefix
        }

        let ret = undefined;
        try {
            let dat = await this.s3.listObjects(param).promise()
            let len = prefix.length
            ret = dat["Contents"].map(x => {
                let key = x["Key"]
                return key.substring(len)
            }).filter(x => {
                return !(x.startsWith("."))
            })

        } catch (err) {
            console.log(err)
        }

        return ret;
    }

    async listFilesByType(type) {
        let prefix = this.typePrefix + type + "/"

        let param = {
            Bucket: this.bucket,
            Prefix: prefix
        }
        
        let dat = undefined;
        try {
            dat = await this.s3.listObjects(param).promise()
        }catch (err) {
            console.log(err)
            return undefined; 
        }

        let keys = dat["Contents"].map(x => {
            return x["Key"]
        })

        let tmp1 = keys.map(x => {
            let param2 = {
                Bucket: this.bucket,
                Key: x,
                Range: "bytes=0-0"
            }
            return this.s3.getObject(param2).promise()
        })


        return (await Promise.all(tmp1)).map(x => {
            return x["Metadata"]
        })
    }
    /**
     * 
     * @param {string} fn filename
     * @param {string} dir dir name 
     * @param {string} base64 image's base64 code, with prefix 
     * @param {object} metadata metadata
     * @returns 
     */

    async upload(fn, dir, base64, metadata) {
        let fullname = dir + "/" + fn;

        let tag = await this.aiGetType(base64)
        let linkname = this.typePrefix + tag + "/" + fullname;

        let hidejson = {
            tag: tag,
            linkname: linkname
        };

        let param = {
            Bucket: this.bucket,
            Key: fullname,
            Body: base64,
            Metadata: {
                hide: encodeURI(JSON.stringify(hidejson)),
                user: encodeURI(JSON.stringify(metadata))
            }
        }

        let linkparam = {
            Bucket: this.bucket,
            Key: linkname,
            Body: fullname,
            Metadata: {
                srcdir: encodeURI(dir),
                srcfn: encodeURI(fn)
            }
        };

        let ret = true;
        try {
            await this.s3.putObject(param).promise()
            await this.s3.putObject(linkparam).promise()
        } catch (err) {
            console.log(err)
            ret = false;
        }
        return ret;
    }

    /**
     * 
     * @param {string} fn filename
     * @param {string} dir dirname
     * @returns 
     */
    async download(fn, dir) {
        let fullname = dir + "/" + fn;
        let param = {
            Bucket: this.bucket,
            Key: fullname
        }

        let ret = undefined;
        try {
            let dat = await this.s3.getObject(param).promise()
            ret = dat["Body"].toString()
        } catch (err) {
            console.log(err)
        }
        return ret;
    }

    /**
     * 
     * @param {string} fn filename
     * @param {string} dir dir name
     * @returns {object} metadata
     */
    async getMetadata(fn, dir) {
        let fullname = dir + "/" + fn;
        let param = {
            Bucket: this.bucket,
            Key: fullname,
            Range: "bytes=0-0"
        }

        let ret = undefined;
        try {
            let dat = await this.s3.getObject(param).promise()
            ret = JSON.parse(decodeURI(dat["Metadata"]["user"]))
        } catch (err) {
            console.log(err)
        }
        return ret;

    }
    async aiGetTypeWithoutPrefix(base64) {
        let fakePre = "data:image/jpg;base64,"
        return await this.aiGetType(fakePre + base64)
    }

    /**
     * 
     * @param {string} base64Pre  image data, with prefix like: "data:image/jpg;base64,/9...."
     * @return {string} type of the object
     */
    async aiGetType(base64Pre) {
        var requestPath = '/api/imagerecog/china_mobile/engine/image/generalImageDetect'

        let indexTemp = base64Pre.indexOf("base64,");
        let base64 = base64Pre.substring(indexTemp + 7);

        //日期格式
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份 
                "d+": this.getDate(),                    //日 
                "h+": this.getHours(),                   //小时 
                "m+": this.getMinutes(),                 //分 
                "s+": this.getSeconds(),                 //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        //生成uuid作为signatureNonce
        function uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 32; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            //s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        }

        var accessKey = 'faf180bfe02b4fc6a879fe15b5107215'
        var secretKey = 'eaa64921e0154ac4925c9f098d3ee4bc'
        var signatureNonce = uuid()
        var signatureVersion = 'V2.0'
        var signatureMethod = 'HmacSHA1'
        var timestamp = new Date().format("yyyy-MM-ddThh%3Amm%3AssZ")

        var queryString = 'AccessKey=' + accessKey + '&SignatureMethod=' + signatureMethod + "&SignatureNonce=" + signatureNonce + "&SignatureVersion=" + signatureVersion + "&Timestamp=" + timestamp
        var sha256String = CryptoJS.SHA256(queryString).toString()
        var requestMethod = "POST"
        requestPath = requestPath.replace(/\//g, '%2F')
        var before = requestMethod + '\n' + requestPath + '\n' + sha256String

        var signature = CryptoJS.HmacSHA1(before, 'BC_SIGNATURE&' + secretKey).toString()

        //pm.environment.set("request_param", queryString + "&Signature=" + signature);

        var request_param = queryString + "&Signature=" + signature;
        // console.log(pm.environment.get("request_param"))
        // console.log(request_param)


        var options = {
            'rejectUnauthorized': false,
            'method': 'POST',
            'url': 'https://api-wuxi-1.cmecloud.cn:8443/api/imagerecog/china_mobile/engine/image/generalImageDetect?' + request_param,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "image": base64
            })
        }

        let dat;
        try {
            dat = JSON.parse((await request(options)));
        } catch (err) {
            console.log(err)
            dat = undefined;
        }

        if (dat.state === 'OK') {
            return dat["body"][0]["classes"]
        } else {
            console.log(dat)
            return "未分类";
        }
    }

    async deleteFileByFullname(fullname) {

        let getMetadata = {
            Bucket: this.bucket,
            Key: fullname,
            Range: "bytes=0-0"
        }

        // get the link name from real file name
        let hide = undefined
        try {
            let dat = await this.s3.getObject(getMetadata).promise()
            hide = JSON.parse(decodeURI(dat["Metadata"]["hide"]))
            console.log(hide)
        } catch (err) {
            console.log(err)
        }

        // delete the link
        if (hide === undefined) {
            return false;
        } else {
            let tmp = {
                Bucket: this.bucket,
                Key: hide["linkname"]
            }
            console.log(tmp)
            await this.s3.deleteObject(tmp).promise()
        }

        let param = {
            Bucket: this.bucket,
            Key: fullname
        }

        // delete the real file
        let ret = true;
        try {
            await this.s3.deleteObject(param).promise()
        } catch (err) {
            ret = false;
        }
        return ret;

    }

    async deleteFile(fn, dir) {
        let fullname = dir + "/" + fn
        this.deleteFileByFullname(fullname)
    }

    async moveFile(fn, dir) {
    }


}

// export class AccountAuth {

class AccountAuth {	
    constructor() {
        let ak = "IZRPYLPMWZXW009G467Y";
        let sk = "DXw4H04FksjkCo19uy33rOnZwG8Ixfhte8xqXKPR";
        let s3 = new aws.S3({
            apiVersion: '2006-03-01',
            accessKeyId: ak,
            secretAccessKey: sk,
            endpoint: "eos-ningbo-1.cmecloud.cn",
            s3ForcePathSytle: true,
            signatureVersion: 'v2',
            sslEnable: true
        })
        this.s3 = s3;
        this.account_bucket = "meta.account";
    }
	test(){
		console.log("tset!!!")
		
	}
    async register(userName, password) {
        let params = {
            Bucket: this.account_bucket,
            Body: password,
            Key: userName
        };

        let params2 = {
            Bucket: userName,
            ACL: "private",
            CreateBucketConfiguration: {
                LocationConstraint: "ningbo1"
            }
        };

        console.log(params2)
        try {
            await this.s3.createBucket(params2).promise();
        } catch (err) {
            console.log(err)
            return false;
        }

        let ret = true;
        try {
            await this.s3.putObject(params).promise()
        } catch (err) {
            ret = false;
        }
        return ret;
    }

    async checkExist(userName) {
        let params = {
            Bucket: this.account_bucket,
            Key: userName
        };

        let dat = undefined;
        let ret;
        try {
            dat = await this.s3.headObject(params).promise();
            ret = true;
        } catch (err) {
            ret = false;
        }
        return ret;
    }

    async auth(userName, password) {
        let params = {
            Bucket: this.account_bucket,
            Key: userName
        };

        let req_password = undefined
        let dat;
        let ret = false;

        try {
            dat = await this.s3.getObject(params).promise()
        } catch (err) {
            dat = undefined;
        }

        if (dat !== undefined) {
            req_password = dat["Body"].toString();
            ret = (req_password === password);
        } else {
            ret = false;
        }
        return ret;
    }

    async changePassword(userName, oldPassoword, newPassword) {
        let ck = await this.auth(userName, oldPassoword);
        if (ck === true) {
            let params = {
                Bucket: this.account_bucket,
                Key: userName
            }
            await this.register(userName, newPassword);
            return true;
        } else {
            return false;
        }
    }

    async getUser(userName, password) {
        let ck = await this.auth(userName, password);
        if (ck === true) {
            return new UserAccount(this.s3, userName)
        } else {
            return undefined;
        }
    }
}


(async function () {
    let auth = new AccountAuth();
    let user = await auth.getUser("gby", "password");
	console.log(user)
 //    let dat1 = await imageToBase64("./test.jpg")
	// console.log(dat1)
 //    let dat2 = await imageToBase64("./pic2.jpg")
 //    let dat3 = await imageToBase64("./pic3.jpg")
 //    let fakePre = "data:image/jpg;base64,"
 //    await user.upload("file1", "dir2", fakePre + dat1, { "hello": "world" })
 //    await user.upload("file2", "dir2", fakePre + dat2, { "hello": "world" })
 //    await user.upload("file3", "dir2", fakePre + dat3, { "hello": "world" })
 //    await user.upload("file4", "dir2", fakePre + dat3, { "hello": "world" })

	// console.log(await user.listDirectory())


 //    await user.deleteFile("file1", "dir2")

 //    let bundle = (await user.listFilesByType("泡泡"))[0]
 //    console.log(await user.listFilesByType("泡泡"))
 //    console.log(await user.download(bundle["srcfn"], bundle["srcdir"]))
    
    
}())
