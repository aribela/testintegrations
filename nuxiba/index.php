<?php 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test nuxiba</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="css/themes/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="js/boostrap-select/bootstrap-select.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/boostrap-select/bootstrap-select.min.js"></script>
    <script type="text/javascript" src="js/functionsGlobals.js?upd=<?php echo time(); ?>"></script> 
    <script type="text/javascript" src="js/functions.js?upd=<?php echo time(); ?>"></script>
    <script type="text/javascript" src="js/functionsNuxiba.js?upd=<?php echo time(); ?>"></script>
    <script type="text/javascript" src="js/jquery.validate.js"></script>
    <script>
        //document ready
        $(document).ready(function() {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => muestraUsuarios(json));
        });
    </script>
</head>
<body>
    <div class="row" id="">
        <div class="col-sm-1"></div>
        <div class="col-sm-10" id="divContent"></div>
        <div class="col-sm-1"></div>
    </div>

    <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Detalle usuario</h4>
        </div>
        <div class="modal-body">
          <div id="contentDetalle"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>