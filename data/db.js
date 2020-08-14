const oracledb = require('oracledb');
var config = {
    user:'sde',
    password:'sde',
    connectString : "xxx:1521/orcl"}
    ;
    let allsql = function(valus) {
 
        return new Promise(( resolve,reject ) => {
            oracledb.getConnection(
                config, //调用连库变量
                function(err, connection)
                    {
                        if (err) {
                        console.error(err.message); //打印错误信息
                        return;
                        }
            //查库
                        connection.execute("SELECT * from sde.SITUATIONDATA where TIME ='"+valus+"'",
                           function(err, result)
                            {
                                if (err) {
                                console.error(err.message); //执行错误
                                doRelease(connection); //关闭连接并返回错误
                                return;
                                 }
                                resolve(JSON.stringify(result));
                            });
                 });
            function doRelease(connection)
                {
                    connection.close(
                    function(err) {
                        if (err) {console.error(err.message); }
                     });
            }
        })
    }
    module.exports = allsql;  //这里是为了让app.js调用