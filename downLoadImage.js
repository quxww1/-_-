const downloadImage = (url, name) => {
                // 实例化画布
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");

                // 实例化一个图片对象
                let image = new Image();
                image.crossOrigin = "Anonymous";
                image.src = url;

                // 当图片加载完毕
                image.onload = () => {
                    // 将图片画在画布上
                    canvas.height = image.height;
                    canvas.width = image.width;
                    context.drawImage(image, 0, 0);

                    // 将画布的内容转换成base64地址
                    let dataURL = canvas.toDataURL("image/png");

                    // 创建a标签模拟点击进行下载
                    let a = document.createElement("a");
                    a.hidden = true;
                    a.href = dataURL;
                    a.download = name;

                    document.body.appendChild(a);
                    a.click();
                };
      };
