const oracledb = require('oracledb');
var config = {
    user:'sde',
    password:'sde',
    connectString : "10.136.6.35:1521/orcl"}
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
                        // connection.execute("INSERT INTO sde.SITUATIONDATA(OBJECTID,NAME,TIME,SHAPE) VALUES(to_number(sde.gdb_util.next_rowid('sde','SITUATIONDATA')),'"+valus.name+"'"+","+"'"+valus.time+"',sde.st_point('"+valus.x+"','"+valus.y+"',4490))",
                        connection.execute("INSERT INTO sde.SITUATIONDATA(OBJECTID,NAME,COUNT,TIME,SHAPE) VALUES(sde.gdb_util.next_rowid('sde','SITUATIONDATA'),'"+valus.name+"',"+valus.count+",'"+valus.time+"',sde.st_point('"+valus.x+"','"+valus.y+"',4490))",
                           function(err, result)
                            {
                                if (err) {
                                console.error(err.message); //执行错误
                                doRelease(connection); //关闭连接并返回错误
                                return;
                                 }
                                resolve(JSON.stringify(result));
                            });
                            console.log("跑过来了");
                            connection.commit();
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