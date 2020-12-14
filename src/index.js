const getDiff = (file1, file2) => {
    let result = '';
    const arr1Keys = Object.keys(file1);
    const arr2Keys = Object.keys(file2);
  
    for (const key of arr1Keys) {
      let substring;
      if (arr2Keys.indexOf(key) >= 0) {
        substring = file1[key] === file2[key] ? `    ${key}: ${file1[key]}\n` : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      } else {
        substring = `  - ${key}: ${file1[key]}\n`;
      }
      result += substring;
    }
  
    for (const key of arr2Keys) {
      let substring = '';
      if (arr1Keys.indexOf(key) === -1) {
        substring = `  + ${key}: ${file2[key]}\n`;
      }
      result += substring;
    }
  
    return `{\n${result}\n}`; 
  };

export default getDiff; 