const fs = require('fs');
const path = require('path');

exports.resolvedPath = function(directoryPath, fileName)
{
	var mergedPath = path.resolve(directoryPath, fileName);
	return mergedPath;
}

exports.readFile = function (filePath)
{
	return new Promise(function(resolve, reject)
	{
		function readThisFile()
		{
			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) reject(err);
				resolve (data);
			});
		});
	}
}

exports.readDir = function (directoryPath)
{
	return new Promise(function(resolve, reject)
	{
		function readThisDir()
		{
			fs.readDir(directoryPath, 'utf8', (err, files) => {
				if (err) reject(err);
				resolve (files);
			});
		});
	}
}

exports.readDirFiles = function (directoryPath)
{
	return new Promise(function(resolve, reject)
	{
		function readTheseDirFiles()
		{
			var dir = readDir(directoryPath);
			for files in dir
			{
				resolve (readFile(resolvedPath(directoryPath, file)));
			}
			//reject; //directory or file within it can't be read
		};
	});
}