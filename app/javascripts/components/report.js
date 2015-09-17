'use strict';

var _ = require('lodash'),
  React = require('react'),
  Router = require('react-router');

var Profile = React.createClass({
  mixins: [Router.State],

  componentWillMount: function() {
    this.getUser();
  },

  componentWillReceiveProps: function() {
    this.getUser();
  },

  getUser: function() {
    var userData = {},
      user = this.props.viewContext
        ? this.props.viewContext
        : {};

    userData.email = (user.email)
      ? user.email
      : '';
    userData.avatar = (user.avatar)
      ? user.avatar
      : '';
    userData.username = (user.username)
      ? user.username
      : '';
    userData.displayName = (user.displayName)
      ? user.displayName
      : '';

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
                <img className="assignee-img" src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3"/>
              </div>Small (80%)
            </div>
            <div className="medium-box-item">
              <div className="assignee_1">
                <img className="assignee-img" src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3"/>
              </div>
              Medium (30%)
            </div>
            <div className="large-box-item">
              <div className="assignee_1">
                <img className="assignee-img" src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11825598_10152912445037172_1838078511773434435_n.jpg?oh=b14162fd3e0b1e889c0e8ac74f20f1c3&oe=567B2DD3"/>
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
                <h4 className="heading-h4">
                  <strong className="bold">JURY VOTES</strong>
                  <a href="/jury/">KNOW OUR JURY</a>
                </h4>
                <ul className="grid list-votes-users">
                  <li className="col n-6">
                    <div className="content">
                      <figure>
                        <a href="/jury/judge/betamakz/"><img alt="Marcus Stenbeck" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/183/marcus-stenbeck.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Marcus Stenbeck</h5>
                        <a href="http://binalogue.com" rel="nofollow" target="_blank">binalogue.com</a>
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
                        <a href="/jury/judge/ines-gamler/"><img alt="Ines Maria Gamler" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/183/marcus-stenbeck.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Ines Maria Gamler</h5>
                        <a href="http://www.purepleasuredesign.com" rel="nofollow" target="_blank">purepleasuredesign.com</a>
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
                        <a href="/jury/judge/upskydown/"><img alt="Henry Daubrez" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/95/henry-daubrez.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Henry Daubrez</h5>
                        <a href="http://www.upskydown.com" rel="nofollow" target="_blank">upskydown.com</a>
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
                        <a href="/jury/judge/lucasnikitczuk/"><img alt="Lucas Nikitczuk" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/21550/54d20880120df.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Lucas Nikitczuk</h5>
                        <a href="http://www.estudionk.com/" rel="nofollow" target="_blank">estudionk.com</a>
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
                        <a href="/jury/judge/juanmora2/"><img alt="Juan Mora" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/103/juan_mora.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Juan Mora</h5>
                        <a href="http://fixedagency.com" rel="nofollow" target="_blank">fixedagency.com</a>
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
                        <a href="/jury/judge/gonzalo-perez/"><img alt="Gonzalo Perez" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/313/54f9a7b1bafd5.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Gonzalo Perez</h5>
                        <a href="http://www.ruya.ae" rel="nofollow" target="_blank">ruya.ae</a>
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
                        <a href="/jury/judge/gary.paitre/"><img alt="Gary Paitre" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/170632/gary-paitre.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Gary Paitre</h5>
                        <a href="http://www.behance.net/garypaitre" rel="nofollow" target="_blank">behance.net/garypaitre</a>
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
                        <a href="#"><img alt="Awwwards Users" height="68" src="/awards/default/users.jpg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Awwwards Users</h5>
                        <a href="http://" rel="nofollow" target="_blank"></a>
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
                <h4 className="heading-h4">
                  <strong className="bold">USER VOTES</strong>
                </h4>
                <ul className="grid list-votes-users">
                  <li className="col n-12">
                    <div className="content">
                      <figure>
                        <a href="/filippo-spiezia/"><img alt="Jury Name" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/7171/51db2386b196f.jpeg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Filippo Spiezia</h5>
                        <a href="http://filippospiezia.com" rel="nofollow" target="_blank">filippospiezia.com</a>
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
                        <a href="/augustco/"><img alt="Jury Name" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/169163/546be0e9d4ccd.jpeg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>August</h5>
                        <a href="http://august.com.au" rel="nofollow" target="_blank">august.com.au</a>
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
                        <a href="/Adwyse/"><img alt="Jury Name" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/169163/546be0e9d4ccd.jpeg" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Adwyse &amp; Co.</h5>
                        <a href="http://adwyse.de" rel="nofollow" target="_blank">adwyse.de</a>
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
                        <a href="/Adveris/"><img alt="Jury Name" height="68" src="http://www.awwwards.com/media/cache/thumb_image_user_68/awards/avatar/96496/5593ce7b1dd0e.png" width="68"/></a>
                      </figure>
                      <div className="info">
                        <h5>Adveris</h5>
                        <a href="http://www.adveris.fr" rel="nofollow" target="_blank">adveris.fr</a>
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
