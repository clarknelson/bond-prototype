

$(document).ready(function(){
  var textOptions = {
    family : "Avenir Next",
    leading: 1,
    weight: 700,
    paddingLeft: 30,
    paddingTop: 8,
    paddingBottom: 15,
    paddingRight: 30,
    size : (window.innerWidth / 7)
  };

  function convert_to_deg(rad){
    return rad * (180 / Math.PI);
  }
  function buildSection(text_a, text_b, target){
    var $container = $(target);
    var text1 = new Blotter.Text(text_a, textOptions);
    var text2 = new Blotter.Text(text_b, textOptions);
    var material = new Blotter.ChannelSplitMaterial();
    var blotter = new Blotter(material, { texts : [text1,text2] });
    blotter.forText(text1).appendTo($container[0]);
    blotter.forText(text2).appendTo($container[0]);

    $container.mousemove(function(e){
      var halfWidth = parseInt($container.innerWidth() / 2);
      var halfHeight = parseInt($container.innerHeight() / 2);
      var left = e.originalEvent.clientX;
      var top = e.originalEvent.clientY;

      var left_delta = Math.abs(halfWidth - left);
      var top_delta = Math.abs(halfHeight - top);

      var rotationDegree = convert_to_deg(Math.atan(top_delta / left_delta)), finalDegree;
      if(left < halfWidth && top < halfHeight){
        finalDegree = rotationDegree;
      }
      if(left > halfWidth && top < halfHeight){
        finalDegree = 180 - rotationDegree;
      }
      if(left > halfWidth && top > halfHeight){
        finalDegree = 180 + rotationDegree;
      }
      if(left < halfWidth && top > halfHeight){
        finalDegree = 360 - rotationDegree;
      }

      var max_hypotenuse = Math.sqrt((halfWidth * halfWidth) + (halfHeight * halfHeight));
      var hypotenuse = Math.sqrt((left_delta * left_delta) + (top_delta * top_delta));

      blotter.material.uniforms.uOffset.value = (hypotenuse / max_hypotenuse) * 0.15;
      blotter.material.uniforms.uRotation.value = finalDegree;
      blotter.material.uniforms.uAnimateNoise.value = 0.0;
    });
    $container.mouseout(function(e){
      blotter.material.uniforms.uOffset.value = 0.05;
      blotter.material.uniforms.uRotation.value = 30;
      // blotter.material.uniforms.uApplyBlur.value = 0.0;
    });
  }
  buildSection('we foster', 'community', '.section-a .blotter-text')
  buildSection('we create', 'experiences', '.section-b .blotter-text')
  buildSection('we build', 'the future', '.section-c .blotter-text')









});
