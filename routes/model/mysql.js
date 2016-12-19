var mysql= require("mysql"); 

var pool = mysql.createPool({
	  connectionLimit : 20,
	  host     : 'cider.cjvgnltk0cex.ap-northeast-1.rds.amazonaws.com',
	  user     : 'frank',
	  password : 'ss1gyk4w',
	  multipleStatements: true
});

exports.select = function(sql, callback) {	
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, rows, fields) {
			
			if (err) throw err;
			//console.log(err);
			//console.log('result : ');
			//console.log(rows);
			
			connection.release();
			callback(err, rows);
		});	
		
	});
};

exports.insert = function(sql, sets, callback) {
   pool.getConnection(function(err, connection){
      console.log(sets);
      var query = connection.query(sql, sets, function(err, rows, fields) {
         if (err) throw err;
         //console.log(err);
         //console.log('result : ');
         //console.log(rows);
         
         connection.release();
         callback(err, rows);
      });   
      console.log(query.sql);
   });
};


//2016년 12월 16일 수정 사항(재무 테스트용 및 insert 테스트)=====
/*
exports.insert = function(sql, sets, callback) {
   pool.getConnection(function(err, connection){
      //console.log(sets);
	  //if (!sets) return sql;
      var query = connection.query(sql, sets, function(err, rows, fields) {
         //if (err) throw err;
         //console.log(err);
         //console.log('result : ');
         //console.log(rows);
         
          if(err){
           
            return callback(err); 
       	  
       		}
		 connection.release();
		 //callback(err, rows);
		 callback(null,rows);
      });  
     
     // console.log(query.sql);
   });
};
*/
exports.update = function(sql, sets, callback) {
	pool.getConnection(function(err, connection){
		
		connection.config.queryFormat = function (sql, sets) {
			  if (!sets) return sql;
			  return sql.replace(/\:(\w+)/g, function (txt, key) {
			    if (sets.hasOwnProperty(key)) {
			      return this.escape(sets[key]);
			    }
			    return txt;
			  }.bind(this));
			};
			
		connection.query(sql, sets, function(err, rows, fields) {
			
			if (err) throw err;
			//console.log(err);
			//console.log('result : ');
			//console.log(rows);
			
			connection.release();
			callback(err, rows);
		});	
		
	});
};

exports.del = function(sql, callback) {
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, rows, fields) {
			
			if (err) throw err;
			//console.log(err);
			//console.log('result : ');
			//console.log(rows);
			
			connection.release();
			callback(err, rows);
		});	
		
	});
};