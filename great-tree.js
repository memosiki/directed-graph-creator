function matrixArray(rows,columns){
  var arr = [];
  for(var i=0; i<columns; i++){
    arr[i] = [];
    for(var j=0; j<rows; j++){
      arr[i][j] =0;
    }
  }
  return arr;
}

function getIndexById(nodeId,nodes){
	for (var j = 0; j < nodes.length; j++) {
 if (nodes[j].id===nodeId) return j;
}
}

function SubMatrix(A,B)   
{   
    var m = A.length, n = A[0].length, C = [];
    for (var i = 0; i < m; i++)
     { C[i] = [];
       for (var j = 0; j < n; j++) C[i][j] = A[i][j]-B[i][j];
     }
    return C;
}

function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function Minor(A,k){
	var B=matrixArray(A.length-1,A.length-1);
	for (var i = 0; i <k; ++i){
		for (var j = 0; j < k; ++j){		
			B[i][j]=A[i][j];	
		}	
	}
	for (var i = k+1; i <A.length; ++i){
		for (var j = k+1; j < A.length; ++j){		
			B[i-1][j-1]=A[i][j];	
		}	
	}
	return  B;
}

function calcGreatTree(nodes,links) {
	var  matrixA=matrixArray(nodes.length,nodes.length);
	var  matrixD=matrixArray(nodes.length,nodes.length);
	var  partGreatTree=[];
	for (var i = 0; i < links.length; i++) {
		matrixA[getIndexById(links[i].source.id,nodes)][getIndexById(links[i].target.id,nodes)]++;
	}
	for (var i = 0; i < links.length; i++) {
		matrixD[getIndexById(links[i].target.id,nodes)][getIndexById(links[i].target.id,nodes)]++;
	}
	var matrixB=SubMatrix(matrixD,matrixA);
	for (var k = 0; k < nodes.length; k++) {
		partGreatTree[k]=Determinant(Minor(matrixB,k));
	}
	
	var ans="";
	//ans=ans+'Матрица смежности графа<br>';
	//for (var i = 0; i < matrixA.length; i++) 
	//	ans=ans+matrixA[i]+'<br>';
	//ans=ans+'<br>Матрица D<br>';
	//for (var i = 0; i < matrixD.length; i++) 
	//	ans=ans+matrixD[i]+'<br>';	
	for (var i = 0; i < partGreatTree.length; i++) {
		if(partGreatTree[i]){
			ans=ans+nodes[i].title+':  '+(partGreatTree[i])+'<br>';			
			}
	}
	ans=(ans)?'Узел: Количество частичных прадеревьев<br>'+ans:'Нет ни одного частичного прадерева<br>'
	document.getElementById('answer').innerHTML=ans;
}

