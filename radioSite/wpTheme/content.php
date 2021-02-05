<?php/*
<div class="blog-post">
	<h2 class="blog-post-title"><?php the_title(); ?></h2>
<p class="blog-post-meta"><?php the_date(); ?> by <a href="#"><?php the_author(); ?></a></p>

<?php the_content(); ?>
*/?>


<div class='homeContent'>

    <header class='home-header'>

        <div class='logo-header'>
            <div class="logoImg"></div>
        </div>

        <div class='nav-header'>
            <a href='#' class='active'> PROJECTS </a>
            <a href='#'> PROGRAMS </a>
            <a href='#'> PODCASTS </a>
            <a href='#'> CATEGORIES </a>
            <a href='#'> | </a>
        </div>

        <div class='search-header'></div>


        <div class='login-header'></div>



    </header>

    <div class='container'>

        <div class='subcontent'>
            <img class='content-img1'
                src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/headerimg.png' alt='Media'></img>
            <img class='content-img2'
                src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/headerimg.png' alt='Media'></img>
            <div class='content-text-left'>
                <p class='content-subtext1'>PLAYING NOW</P>
                <P class='content-subtext2'>Aarohan-ep 9</p>
                <p class='content-subtext2'>23rd Oct 2020</p>
            </div>
            <div class='content-text-right'>
                <p class='content-subtext1'>UP NEXT</P>
                <P class='content-subtext2'>Nutritional Cultural Redemption-ep 9</p>
                <p class='content-subtext2'>23rd Oct 2020</p>
            </div>

        </div>



        <div class='subsection'>
            <p class='text'>
                <strong> MOST RECENT PODCASTS:</strong> Stay up to date on the latest news, music, art and culture in
                Auroville.
            </p>


            <div class='grid'>
                <img class='radius' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/urban.jpg'
                    alt='Media'></img>
                <div class='subgrid'>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/savitri.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/happiness.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/savitri.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/happiness.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/tirumular.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/edible.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/tirumular.jpg'
                        alt='Media'></img>
                    <img class='radius subgrid1'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/edible.jpg'
                        alt='Media'></img>
                </div>
                <img class='play' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>

            </div>





        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>MOST FOLLOWED PROGRAMS:</strong> Top featured programs in various genres that are popular with
                our listeners.
            </p>
            <div class='grid'>
                <img class='radius' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/savitri.jpg'
                    alt='Media'></img>
                <img class='radius' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/edible.jpg'
                    alt='Media'></img>
                <img class='radius' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/tirumular.jpg'
                    alt='Media'></img>
                <img class='play' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>
            </div>

        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>LIVE CONCERT RECORDINGS:</strong> Live concerts that have taken place in Auroville and have been
                recorded/broadcast
                our listeners.
            </p>
            <div class='grid1'>
                <div class="img1"></div>
                <div class="img2"></div>
                <div class="img3"></div>
                <img class='play' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>
            </div>

        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>TRENDING NOW:</strong> Most popular podcasts and programs this week
                our listeners.
            </p>
            <div class='grid1'>
                <div class="img4"></div>
                <div class="img5"></div>
                <div class="img6"></div>
                <img class='play' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>
            </div>

        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>ALL ARTISTS:</strong> Artists from around Auroville who produce podcasts
            </p>
            <div class='grid1'>
                <div class="img7"></div>
                <div class="img8"></div>
                <div class="img9"></div>
                <img class='play' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>
            </div>

        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>VIDEOS:</strong> Popular videos from our archives.
            </p>

            <div class='grid'>
                <img class='radius concertimg'
                    src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/concert.jpg' alt='Media'></img>
                <div>
                    <img class='radius' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/music.jpg'
                        alt='Media'></img>
                    <img class='radius'
                        src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/interview.jpg'
                        alt='Media'></img>
                </div>

                <img class='play margin' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/play.png'
                    alt='Media'></img>

            </div>
        </div>

        <hr>

        <div class='subsection'>
            <p class='text'>
                <strong>DISCOVER:</strong> Discover podcasts and music according to genre.
            </p>
            <div class='discover'>
                <div class='nature sub'>
                    <p>NATURE</p>
                </div>
                <div class='culture sub'>
                    <p> CULTURE</p>
                </div>
                <div class='music sub'>
                    <p> MUSIC</p>
                </div>
            </div>
            <div class='discover'>
                <div class='culture sub'>
                    <p> PHILOSOPHY</p>
                </div>
                <div class='music sub'>
                    NEWS <br>AND <br>TALKS
                </div>
                <div class='nature sub'>
                    <p> CONCERTS</p>
                </div>

            </div>

            <hr>

            <div class='footer'>
                <div class='footer-left'>
                    <p>INFO
                    <p>
                    <P>WHO WE ARE</P>
                    <P>OUR PARTNERS</P>
                </div>
                <div class='footer-right'>
                    <p>SOCIAL MEDIA</p>
                    <p><img src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/social-icons.png'
                            alt='Media'></img></p>
                </div>
            </div>

            <div>
                <img class='footer-end' src='<?php echo get_bloginfo( 'template_directory' );?>/sampleImages/banner.png'
                    alt='Media'></img>
            </div>

        </div>

    </div>



    <!--<div id="react_root"></div>

	