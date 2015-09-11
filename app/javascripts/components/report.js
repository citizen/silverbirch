'use strict';

var _ = require('lodash'),
    React = require('react'),
    Router = require('react-router');

var Profile = React.createClass({
  mixins: [
    Router.State
  ],

  componentWillMount: function() {
    this.getUser();
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  getUser: function() {
    var userData = {},
        user = this.props.viewContext ? this.props.viewContext : {};

    userData.email = (user.email) ? user.email : '';
    userData.avatar = (user.avatar) ? user.avatar : '';
    userData.username = (user.username) ? user.username : '';
    userData.displayName = (user.displayName) ? user.displayName : '';

    this.setState({
      user: userData
    });
  },

  render: function() {
    return (
      <div className="board">

      <div className="to-do">
      <div className="title">To Do</div>
      <div className="title">Average Complete Time</div>
      <div className="title">Overhang</div>
      <div className="title">Testing (Pass) (Fail)</div>
      <div className="box">
            <div className="small-box-item">
                <div className="assignee_1">
<img src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3" className="assignee-img"/>
</div>Small (80%)
            </div>
            <div className="medium-box-item"><div className="assignee_1">
<img src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3" className="assignee-img"/>
</div>
                Medium (30%)
            </div>
            <div className="large-box-item"><div className="assignee_1">
<img src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3" className="assignee-img"/>
</div>
                Large (50%)
            </div>
      </div>
      </div>

      <div className="in-progress">
      <div className="title">In Progress</div>
      <div className="title">Average Complete Time</div>
      <div className="title">Overhang</div>
      <div className="title">Testing (Pass) (Fail)</div>
      <div className="box">
            <div className="small-box-item">
                Small (80%)
            </div>
            <div className="medium-box-item">
                Medium (30%)
            </div>
            <div className="large-box-item">
                Large (50%)
            </div>
      </div>
      </div>

      <div className="done">
      <div className="title">Done</div>
      <div className="title">Average Complete Time</div>
      <div className="title">Overhang</div>
      <div className="title">Testing (Pass) (Fail)</div>
      <div className="box">
            <div className="small-box-item">
                Small (80%)
            </div>
            <div className="medium-box-item">
                Medium (30%)
            </div>
            <div className="large-box-item">
                Large (50%)
            </div>
      </div>
      </div>

      <div className="qa">
      <div className="title">QA</div>
      <div className="title">Average Complete Time</div>
      <div className="title">Overhang</div>
      <div className="title">Testing (Pass) (Fail)</div>
      <div className="box">
            <div className="small-box-item">
                Small (80%)
            </div>
            <div className="medium-box-item">
                Medium (30%)
            </div>
            <div className="large-box-item">
                Large (50%)
            </div>
      </div>
      </div>

      <div className="block" id="block-jury-votes">
        <div className="inner">
            <div className="grid one-row">
                <div className="col n-8">
                    <h4 className="heading-h4"><strong className="bold">JURY VOTES</strong> <a href="/jury/">KNOW OUR JURY</a></h4>
                    <ul className="grid list-votes-users">
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/betamakz/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/183/marcus-stenbeck.jpg" width="68" height="68" alt="Marcus Stenbeck"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Marcus Stenbeck</h5>
                                        <a rel="nofollow" href="http://binalogue.com" target="_blank">binalogue.com</a>
                                        <div className="list-notes">
                                                                                             <strong>7.5</strong>
                                                 <ul>
                                                    <li className="design">8</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">7</li>
                                                    <li className="content">8</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/ines-gamler/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/183/marcus-stenbeck.jpg" width="68" height="68" alt="Ines Maria Gamler"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Ines Maria Gamler</h5>
                                        <a rel="nofollow" href="http://www.purepleasuredesign.com" target="_blank">purepleasuredesign.com</a>
                                        <div className="list-notes">
                                                                                             <strong>6.7</strong>
                                                 <ul>
                                                    <li className="design">7</li>
                                                    <li className="usability">6</li>
                                                    <li className="creativity">7</li>
                                                    <li className="content">7</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/upskydown/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/95/henry-daubrez.jpg" width="68" height="68" alt="Henry Daubrez"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Henry Daubrez</h5>
                                        <a rel="nofollow" href="http://www.upskydown.com" target="_blank">upskydown.com</a>
                                        <div className="list-notes">
                                                                                             <strong>7.2</strong>
                                                 <ul>
                                                    <li className="design">8</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">6</li>
                                                    <li className="content">7</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/lucasnikitczuk/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/21550/54d20880120df.jpg" width="68" height="68" alt="Lucas Nikitczuk"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Lucas Nikitczuk</h5>
                                        <a rel="nofollow" href="http://www.estudionk.com/" target="_blank">estudionk.com</a>
                                        <div className="list-notes">
                                                                                             <strong>8.2</strong>
                                                 <ul>
                                                    <li className="design">9</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">8</li>
                                                    <li className="content">9</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/juanmora2/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/103/juan_mora.jpg" width="68" height="68" alt="Juan Mora"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Juan Mora</h5>
                                        <a rel="nofollow" href="http://fixedagency.com" target="_blank">fixedagency.com</a>
                                        <div className="list-notes">
                                                                                             <strong>7.5</strong>
                                                 <ul>
                                                    <li className="design">8</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">7</li>
                                                    <li className="content">8</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/gonzalo-perez/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/313/54f9a7b1bafd5.jpg" width="68" height="68" alt="Gonzalo Perez"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Gonzalo Perez</h5>
                                        <a rel="nofollow" href="http://www.ruya.ae" target="_blank">ruya.ae</a>
                                        <div className="list-notes">
                                                                                             <strong>7</strong>
                                                 <ul>
                                                    <li className="design">7</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">7</li>
                                                    <li className="content">7</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="/jury/judge/gary.paitre/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/170632/gary-paitre.jpg" width="68" height="68" alt="Gary Paitre"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Gary Paitre</h5>
                                        <a rel="nofollow" href="http://www.behance.net/garypaitre" target="_blank">behance.net/garypaitre</a>
                                        <div className="list-notes">
                                                                                             <strong>7.7</strong>
                                                 <ul>
                                                    <li className="design">8</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">8</li>
                                                    <li className="content">8</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                                                                <li className="col n-6">
                                <div className="content">
                                    <figure>
                                                                                    <a href="#"><img src="/awards/default/users.jpg" width="68" height="68" alt="Awwwards Users"/></a>
                                                                            </figure>
                                    <div className="info">
                                        <h5>Awwwards Users</h5>
                                        <a rel="nofollow" href="http://" target="_blank"></a>
                                        <div className="list-notes">
                                                                                             <strong>7.1</strong>
                                                <ul>
                                                    <li className="design">7</li>
                                                    <li className="usability">7</li>
                                                    <li className="creativity">7</li>
                                                    <li className="content">7</li>
                                                </ul>
                                                                                    </div>
                                    </div>
                                </div>
                            </li>
                                            </ul>
                </div>
                <div className="col n-4">
                    <h4 className="heading-h4"><strong className="bold">USER VOTES</strong></h4>
                    <ul className="grid list-votes-users">
                                                <li className="col n-12">
                            <div className="content">
                                <figure>
                                    <a href="/filippo-spiezia/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/7171/51db2386b196f.jpeg" width="68" height="68" alt="Jury Name"/></a>
                                </figure>
                                <div className="info">
                                    <h5>Filippo Spiezia</h5>
                                    <a rel="nofollow" href="http://filippospiezia.com" target="_blank">filippospiezia.com</a>
                                    <div className="list-notes style2">
                                        <strong>8</strong>
                                        <ul>
                                            <li className="design">8</li>
                                            <li className="usability">8</li>
                                            <li className="creativity">8</li>
                                            <li className="content">8</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                                                <li className="col n-12">
                            <div className="content">
                                <figure>
                                    <a href="/augustco/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/169163/546be0e9d4ccd.jpeg" width="68" height="68" alt="Jury Name"/></a>
                                </figure>
                                <div className="info">
                                    <h5>August</h5>
                                    <a rel="nofollow" href="http://august.com.au" target="_blank">august.com.au</a>
                                    <div className="list-notes style2">
                                        <strong>7.1</strong>
                                        <ul>
                                            <li className="design">8</li>
                                            <li className="usability">6</li>
                                            <li className="creativity">7</li>
                                            <li className="content">7</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                                                <li className="col n-12">
                            <div className="content">
                                <figure>
                                    <a href="/Adwyse/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/266860/54b3d1238e6c5.png" width="68" height="68" alt="Jury Name"/></a>
                                </figure>
                                <div className="info">
                                    <h5>Adwyse &amp; Co.</h5>
                                    <a rel="nofollow" href="http://adwyse.de" target="_blank">adwyse.de</a>
                                    <div className="list-notes style2">
                                        <strong>8</strong>
                                        <ul>
                                            <li className="design">8</li>
                                            <li className="usability">8</li>
                                            <li className="creativity">8</li>
                                            <li className="content">8</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                                                <li className="col n-12">
                            <div className="content">
                                <figure>
                                    <a href="/Adveris/"><img src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/96496/5593ce7b1dd0e.png" width="68" height="68" alt="Jury Name"/></a>
                                </figure>
                                <div className="info">
                                    <h5>Adveris</h5>
                                    <a rel="nofollow" href="http://www.adveris.fr" target="_blank">adveris.fr</a>
                                    <div className="list-notes style2">
                                        <strong>7</strong>
                                        <ul>
                                            <li className="design">7</li>
                                            <li className="usability">7</li>
                                            <li className="creativity">7</li>
                                            <li className="content">7</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                                            </ul>
                </div>
            </div>
        </div>
    </div>

      </div>


    );
  }
});

module.exports = Profile;
