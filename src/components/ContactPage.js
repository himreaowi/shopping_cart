import '../styles/ContactPage.css';

function ContactPage(){
return (
    <div className ="flex-col contact-cont">
        <div>
            <h2>HOME MARKET</h2>
            <p> Home Market is an online grocery purchasing application.</p>
        </div>
      
      <div>
          <label>Contact No</label>
          <p>1234567891</p><br/>
          <label>Email</label>
          <p>shopping_website@email.com</p>
      </div>
      <div>
          <label>For any queries, please email us at</label>
          <p>shopping_website_query@email.com</p>
      </div>
    </div>
);
}

export default ContactPage;