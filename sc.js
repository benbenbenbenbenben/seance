var edge = require('edge');

var capture = edge.func(function(){/*
#r "System.Drawing.dll"
#r "System.Windows.Forms.dll"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


    public class Startup
    {
        public async Task<object> Invoke(object input)
        {
            SetProcessDPIAware();
            
            var bmp = new Bitmap(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
            var gfx = Graphics.FromImage(bmp);
            gfx.CopyFromScreen(0, 0, 0, 0, bmp.Size);
            bmp.Save("C:\\temp\\capture.png", ImageFormat.Png);

            return "ok";
        }

        [DllImport("user32.dll", SetLastError = true)]
        static extern bool SetProcessDPIAware();
    }

*/});

capture('JavaScript', function (error, result) {
    if (error) throw error;
    console.log(result);
});