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
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve (data);
		});
	});
}

exports.readDir = function (directoryPath)
{
	return new Promise(function(resolve, reject)
	{
		fs.readDir(directoryPath, 'utf8', (err, files) => {
			if (err) reject(err);
			else resolve (files);
		});
	});
}

exports.readDirFiles = function (directoryPath)
{
	var dir = exports.readDir(directoryPath)
		.then(function(files) {
			var fileContents = [];
			for (var i=0; i < files.length; i++)
			{
				var filePath = exports.resolvedPath(directoryPath, files[i]);
				fileContents.push(exports.readFile(filePath));
			}
			return Promise.all(fileContents);
		});
	return dir;
}