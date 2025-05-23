
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Panda Page</title>

    <!-- Bootstrap CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            background: url('https://images.unsplash.com/photo-1502082553048-f009c37129b9') no-repeat center center fixed;
            background-size: cover;
            font-family: 'Segoe UI', sans-serif;
        }

        .slider-container {
            margin-top: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .carousel {
            width: 600px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
            border-radius: 12px;
            overflow: hidden;
        }

        .footer {
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            text-align: center;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">

        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">🐼 PandaWorld</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Slider -->
        <div class="slider-container">
            <div id="pandaCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG" class="d-block w-100" alt="Panda 1" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG" class="d-block w-100" alt="Panda 2" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Baby_panda.JPG" class="d-block w-100" alt="Panda 3" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#pandaCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#pandaCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            🐾 Made with ❤️ by BOBY in VB.NET
        </div>
    </form>
</body>
</html>
