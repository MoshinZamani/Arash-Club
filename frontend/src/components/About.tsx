import twoClimbers from "../assets/images/two-climbers.png";

const About = () => (
  <div className="two-section flex bg-center justify-center items-center px-80 py-16">
    <div className="flex justify-center w-3/4">
      <div className="flex flex-col justify-center ml-8">
        <h3>باشگاه کوهنوردی آرش</h3>
        <p>
          گروه كوهنوردي آرش شيراز در سال 1355 با نام« خرد » بصورت غير رسمی
          فعاليت خود را در رشته هاي غار نوردي ، صعود قله ، سنگنوردی و با عضويت
          12 نفر آغاز نمود و در سال 1360 با تصويب هيات مؤسس بنام « آرش » تغيير
          نام يافت و در سال 1377 با مجوز دائم از سوي فدراسيون كوهنوردي جمهوری
          اسلامي ايران رسمأ فعاليت خود را ادامه داده و در حال حاضريكی از گروه
          های مطرح در سطح كشور است.
        </p>
      </div>
      <img src={twoClimbers} alt="Two climbers" className="mr-16" />
    </div>
  </div>
);

export default About;
