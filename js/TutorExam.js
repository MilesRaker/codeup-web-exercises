A = [2,3,4,1]
function mystery(A, index, result){
    if(index < A.length){
        return mystery(A,index++, result*A[index])
    } else {
        return result;
    }
}

console.log(mystery(A, 1, 1));