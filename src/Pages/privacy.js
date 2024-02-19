import React from "react";
import SideBarHeader from "../SideNavBar/SideBarHeader";
import "./PublicPages/Terms/Terms";
import "./privacy.css";
import { useHistory } from "react-router-dom";

function Privacy() {
  let history = useHistory();

  return (
    <div className="col-sm-12 p-0" style={{ backgroundColor: "#F8F8FA" }}>
      <SideBarHeader />
      <div className="col-sm-12 padding-top-tc">
        <div className="row">
          <div className="col-sm-3 text-center d-none d-md-block">
            <button
              onClick={() => history.goBack()}
              className="btn btn-light btn-lg rounded-circle button-outline-tc"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-6">
                <h5 style={{ textAlign: "center" }}>
                  <b>PRIVACY POLICY</b>
                </h5>
              </div>
              <div className="col-sm-6 text-right m-auto">
                <h6>
                  Last modified: <b>November 2, 2023</b>
                </h6>
              </div>
              <div className="col-sm-12 py-4 background_tc mt-4">
                <p>
                  Plexaar (“us,” “we,” “our,” or “the Application”) respects
                  your privacy and are committed to protecting the privacy of
                  the Users of the Application.
                  <br />
                  <br /> By accessing the site and using the services, you agree
                  to the practices and policies outlined in this Privacy Policy
                  and you hereby consent to the collection, use, and sharing of
                  your information as described in this Privacy Policy. If you
                  do not agree with this Privacy Policy, you cannot use the
                  Application. If you use the Application on behalf of someone
                  else, you represent that you are authorized by such individual
                  or entity to accept this privacy policy on such individual’s
                  or entity’s behalf.
                  <br />
                  <br /> Your use of the Application is governed by this Privacy
                  Policy and the Terms of Use.
                </p>
                <h6>
                  <b>INTRODUCTION</b>
                </h6>
                <p>
                  This Privacy Policy describes the types of information we may
                  collect from you or that you may provide when you use the
                  services, and our practices for collecting, using,
                  maintaining, protecting and disclosing that information. This
                  Privacy Policy is only applicable to the information we
                  collect:
                  <ul>
                    <li>On the Application</li>{" "}
                    <li>
                      In e-mail, text and other electronic messages between you
                      and Plexaar.
                    </li>
                  </ul>{" "}
                  This Privacy Policy does not apply to any other website or
                  digital service that you may be able to access through Plexaar
                </p>
                <h6>
                  <b>INFORMATION WE COLLECT</b>
                </h6>
                <p>
                  Personal Information
                  <br />
                  When you access the Application, we may ask you to voluntarily
                  provide us with certain information that personally identifies
                  or could be used to personally identify you (“Personal
                  Information”). Personal Information includes (but is not
                  limited to) the following categories of information:
                  <ul>
                    {" "}
                    <li>
                      {" "}
                      Contact information, such as your name, address, e-mail
                      address and phone number;
                    </li>{" "}
                    <li>
                      Demographic data, such as your gender, date of birth and
                      zip code;
                    </li>
                    <li>
                      {" "}
                      Payment information, such as your credit card number and
                      billing address;
                    </li>
                    <li>
                      {" "}
                      Other information about you that you voluntarily choose to
                      provide to us.
                    </li>{" "}
                  </ul>{" "}
                  We may also collect additional information, which may be
                  Personal Information, as otherwise described to you at the
                  point of collection or pursuant to your consent.
                </p>
                <h6>
                  <b>Traffic Data</b>
                </h6>
                <p>
                  We also may Automatically collect the following types of data
                  when you use the Application: (1) IP address; (2) domain
                  server; (3) type of device(s) used to access the Application;
                  (4) web browser(s) used to access the Application; (5)
                  referring webpage or other source through which you accessed
                  the Application; (6) geolocation information; and (7) other
                  statistics and information associated with the interaction
                  between your browser or device and the Application
                  (collectively “Traffic Data”). Depending on applicable law,
                  some Traffic Data may be Personal Information.
                  <br />
                  <br /> We do not consider Personal Information to include
                  information that has been anonymized so that it does not allow
                  a third party to easily identify a specific individual.
                </p>
                <h6>
                  <b>COLLECTION OF INFORMATION</b>
                </h6>
                <p>
                  We collect information (including Personal Information and
                  Traffic Data) when you use and interact with the Application,
                  and in some cases from third party sources. Such information
                  includes:
                  <ul>
                    {" "}
                    <li>
                      When you use the Application’s interactive tools and
                      services;
                    </li>
                    <li>
                      {" "}
                      When you voluntarily provide information in free-form text
                      boxes or in uploaded documents, pictures or medical
                      records through the Application;
                    </li>
                    <li>
                      {" "}
                      When you respond to surveys or questionnaires from us;
                    </li>{" "}
                    <li>
                      {" "}
                      If you download and install certain applications and
                      software we make available, we may receive and collect
                      information transmitted from your computing device for the
                      purpose of providing you the relevant services, such as
                      information that lets Plexaar know when you are logged on
                      and available to receive update or alert notices;
                    </li>
                    <li>
                      {" "}
                      If you download our mobile application, we may receive
                      information about your location and mobile device;
                    </li>
                    <li>
                      {" "}
                      Through cookies, web beacons, website analytics services
                      and other tracking technology (collectively, “Tracking
                      Tools”); and{" "}
                    </li>
                    <li>
                      {" "}
                      When you use the “Contact Us” function, send us an email
                      or otherwise contact us.
                    </li>
                  </ul>
                </p>
                <h6>
                  <b>USE OF INFORMATION</b>
                </h6>
                <p>
                  We use your Personal Information to provide services to you
                  through the Application and to help improve them, including
                  to:
                  <ul>
                    {" "}
                    <li>
                      Provide you with services and other products, services and
                      information you request and to respond to correspondence
                      that we receive from you;{" "}
                    </li>
                    <li>
                      {" "}
                      Provide, maintain, administer or expand the services,
                      perform business analyses, or for other internal purposes
                      to support, improve or enhance our business, services, and
                      other products and services we offer;{" "}
                    </li>
                    <li>
                      {" "}
                      Notify you about certain resources we think you may be
                      interested in learning more about; Send you information
                      about Plexaar or our products or services;{" "}
                    </li>
                    <li>Contact you when necessary or requested; </li>
                    <li>
                      Customize and tailor your experience of the services,
                      which may include sending customized messages or showing
                      you Sponsored Offers related to goods or services that may
                      be of interest to you based on information collected in
                      accordance with this Privacy Policy;{" "}
                    </li>
                    <li>
                      Send emails and other communications that display content
                      that we think will interest you and according to your
                      preferences;{" "}
                    </li>
                    <li>
                      We may use the information we have collected from you to
                      enable us to display advertisements to our advertisers’
                      target audiences. Even though we do not disclose your
                      Personal Information for these purposes without your
                      consent, if you click on or otherwise interact with an
                      advertisement, the advertiser may assume that you meet its
                      target criteria;{" "}
                    </li>
                    <li>
                      Combine information received from third parties with the
                      information that we have from or about you and use the
                      combined information for any of the purposes described in
                      this Privacy Policy;
                    </li>{" "}
                    <li>
                      {" "}
                      Use non-individually identifiable statistical information
                      that we collect in any way permitted by law, including
                      with third parties in connection with their commercial and
                      marketing efforts; and
                    </li>{" "}
                    <li>
                      {" "}
                      Prevent, detect and investigate security breaches and
                      potentially illegal or prohibited activities.
                    </li>
                  </ul>{" "}
                  We may use information that is not Personal Information to
                  better understand who uses Plexaar and how we can deliver
                  better services, or otherwise at our discretion.
                </p>
                <h6>
                  <b>DISCLOSURE OF INFORMATION</b>
                </h6>
                <p>
                  {" "}
                  <ul>
                    <li>
                      We may disclose your Personal Information and certain
                      information that you provide to us or we collect from you
                      with:{" "}
                      <ul>
                        <li> Persons authorized by you;</li>
                        <li>
                          {" "}
                          Federal Board of Revenue, National Accountability
                          Bureau, Federal Investigation Authority or any other
                          Government body we are liable to provide for security
                          and other reasons.
                        </li>{" "}
                      </ul>
                    </li>
                    <li>
                      {" "}
                      We do not sell email addresses to third parties. You may
                      voluntarily provide your e-mail address at your option to
                      other providers who have referral links to their website
                      from our Application.
                    </li>
                    <li>
                      {" "}
                      We may share your Personal Information and Traffic Data
                      with our business partners who perform core operational
                      services for Plexaar(such as hosting, billing, fulfilment,
                      data storage, security, insurance verification, or Website
                      analytics set forth in Section 3 (Tracking Tools) and/or
                      by making certain features available to our users.{" "}
                    </li>
                    <li>
                      {" "}
                      We may transfer your information to another company in
                      connection with a merger, sale, acquisition or other
                      change of ownership or control by or of Plexaar (whether
                      in whole or in part). Should one of these events occur, we
                      will make reasonable efforts to notify you before your
                      information becomes subject to different privacy and
                      security policies and practices.
                    </li>
                    <li>
                      {" "}
                      We also may need to disclose your Personal Information or
                      any other information we collect about you if we determine
                      in good faith that such disclosure is needed to: (1)
                      comply with applicable law, regulation, court order or
                      other legal process;, another person or the public; (2)
                      enforce the Terms of Use with you; or (3) respond to
                      claims that any posting or other content violates
                      third-party rights.
                    </li>
                  </ul>{" "}
                  We may disclose information that is not Personal Information
                  (including information that has been de-identified and
                  aggregated) at our discretion.
                </p>
                <h6>
                  <b>CHANGES TO THIS PRIVACY POLICY</b>
                </h6>
                <p>
                  Plexaar reserves the right to change the terms of this Privacy
                  Policy at any time. If we change the terms of this Privacy
                  Policy, the new terms will apply to all Personal Information
                  Plexaar maintains, including information that was created or
                  received before such changes were made.
                </p>
                <h6>
                  <b>AMENDING YOUR PERSONAL INFORMATION</b>
                </h6>
                <p>
                  If you are a registered user of the Application, you may
                  review and modify the information you entered into your
                  account. You can also modify your Personal Information,
                  including your username and password, by accessing the
                  settings for your account.
                  <br />
                  <br /> If you wish to close your account, please email us at
                  contact@plexaar.com. We will delete your account and all of
                  your Personal Information at your request as soon as
                  reasonably possible. Please know that Plexaar does reserve the
                  right to retain certain information from closed accounts in
                  order to comply with law, prevent fraud, resolve disputes,
                  enforce the Terms of Use and take other actions permitted by
                  law.{" "}
                </p>
                <h6>
                  <b>CONTACT</b>
                </h6>{" "}
                <p>
                  If you have questions, concerns or comments regarding this
                  Privacy Policy, please contact us at contact@plexaar.com.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
