import 'dart:io';

import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String result="";
  File image;
  ImagePicker imagePicker;
  pickImageFromGallery() async {
    PickedFile pickedFile = await imagePicker.getImage(source: ImageSource.gallery);
    image = File(pickedFile.path);
    setState(() {
      image;
      performImageLabelling();
    });
  }

  captureImageWithCamera() async {
    PickedFile pickedFile = await imagePicker.getImage(source: ImageSource.camera);
    image = File(pickedFile.path);
    setState(() {
      image;
      performImageLabelling();
    });
  }

  
performImageLabelling() async {
  final InputImage inputImage = InputImage.fromFile(image);
  final textRecognizer = GoogleMlKit.vision.textRecognizer();
  
  final RecognizedText recognizedText = await textRecognizer.processImage(inputImage);

  setState(() {
    result = "";
    for (TextBlock block in recognizedText.blocks) {
      for (TextLine line in block.lines) {
        result += line.text + "\n";
      }
      result += "\n\n";
    }
  });

  textRecognizer.close();  // Always close the recognizer when done
}

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    imagePicker = ImagePicker();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/back.jpg'), fit: BoxFit.cover),
        ),
        child: Column(
          children: [
            SizedBox(width:100,),
            Container(
              height: 250,
              width: 250,
              margin: EdgeInsets.only(top: 80),
              padding: EdgeInsets.only(left: 28, bottom: 5, right: 18),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(40.0),
                  child: Text(
                    result,
                    style: TextStyle(fontSize: 14.0),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
              decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('assets/note.png'), fit: BoxFit.cover),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 20, right: 140),
              child: Stack(
                children: [
                  Stack(
                    children: [
                      Center(
                        child: Image.asset('assets/pin.png',height: 240, width: 240,
                        ),
                      ),
                    ],
                  ),
                  Center(
                    child: FlatButton(
                      onPressed: (){
                        pickImageFromGallery();
                        },
                      onLongPress: (){
                        captureImageWithCamera();
                      },
                      child: Container(
                        margin: EdgeInsets.only(top: 25),
                        child: image != null
                            ? Image.file(image, width: 120,height: 162, fit: BoxFit.fill,) : Container(
                          width: 240,
                          height: 200,
                        //  child: Icon(Icons.camera_front, size: 50, color: Colors.grey,),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
